'use strict';

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import {List, Map, OrderedMap} from 'immutable';

const PATH_LEXICON = path.join(process.cwd(), 'lexicon');

const PATH_ATLAS_THEME_VARIABLES = path.join(PATH_LEXICON, 'src/scss/atlas-theme/variables');

const PATH_ATLAS_THEME_VARIABLES_FILE = path.join(PATH_LEXICON, 'src/scss/atlas-theme/_variables.scss');

const PATH_BOOTSTRAP_VARIABLES_FILE = path.join(PATH_LEXICON, 'src/scss/bootstrap/_variables.scss');

const PATH_LEXICON_BASE_VARIABLES = path.join(PATH_LEXICON, 'src/scss/lexicon-base/variables');

const PATH_LEXICON_BASE_VARIABLES_FILE = path.join(PATH_LEXICON, 'src/scss/lexicon-base/_variables.scss');

const REGEX_BOOTSTRAP_COMPONENT_NAME = /([\w\s]+)\n/;

module.exports = {
	flattenVariables: function(variables, object) {
		var instance = this;

		object = object || {};

		return _.reduce(variables, function(result, item, index, obj) {
			if (_.isObject(item)) {
				return instance.flattenVariables(item, result);
			}
			else {
				result[index] = item;
			}

			return result;
		}, object);
	},

	mapAtlasVariables: function() {
		var lexiconBaseVariables = this.mapLexiconVariables();

		var atlasVariables = this._mapVariablesFromComponentArray(this._getAtlasThemeComponents(), PATH_ATLAS_THEME_VARIABLES, 'lexicon');

		return lexiconBaseVariables.merge(atlasVariables);
	},

	mapBootstrapVariables: function() {
		return this._mapBootstrapVariablesFile();
	},

	mapThemeVariables: function(themePath) {
		return this.mapVariablesFromFile(path.join(themePath, 'src/css/_aui_variables.scss'), 'theme', '');
	},

	mapLexiconVariables: function() {
		return this._mapVariablesFromComponentArray(this._getLexiconBaseComponents(), PATH_LEXICON_BASE_VARIABLES, 'lexicon');
	},

	mapVariablesFromFile: function(filePath, group, component) {
		if (!filePath || !fs.existsSync(filePath)) {
			return OrderedMap();
		}

		var fileContents = fs.readFileSync(filePath, {
			encoding: 'utf8'
		});

		return this._mapVariablesFromString(fileContents, group, component);
	},

	_getAtlasThemeComponents: function() {
		return this._getComponentArrayFromVariablesFile(PATH_ATLAS_THEME_VARIABLES_FILE);
	},

	_getComponentArrayFromVariablesFile: function(filePath) {
		var fileContents = fs.readFileSync(filePath, {
			encoding: 'utf8'
		});

		var regex = /\@import\s\"variables\/(.*)\"/;

		return _.reduce(fileContents.split('\n'), function(result, item, index) {
			var match = item.match(regex);

			if (match) {
				result.push(match[1]);
			}

			return result;
		}, []);
	},

	_getLexiconBaseComponents: function() {
		return this._getComponentArrayFromVariablesFile(PATH_LEXICON_BASE_VARIABLES_FILE);
	},

	_mapBootstrapVariablesFile: function() {
		var instance = this;

		var fileContents = fs.readFileSync(PATH_BOOTSTRAP_VARIABLES_FILE, {
			encoding: 'utf8'
		});

		var fileSections = fileContents.split('//== ');

		var orderedMap = OrderedMap();

		_.forEach(fileSections, function(item, index) {
			if (index == 0) {
				return;
			}

			var name = item.match(REGEX_BOOTSTRAP_COMPONENT_NAME);

			if (name && name.length) {
				orderedMap = orderedMap.merge(instance._mapVariablesFromString(item, 'bootstrap', name[1]));
			}
		});

		return orderedMap;
	},

	_mapVariablesFromComponentArray: function(componentArray, variablesDir, group) {
		var instance = this;

		var orderedMap = OrderedMap();

		_.forEach(componentArray, function(item, index) {
			var fileName = '_' + item + '.scss';

			var componentVariables = instance.mapVariablesFromFile(path.join(variablesDir, fileName), group, item);

			orderedMap = orderedMap.merge(componentVariables);
		});

		return orderedMap;
	},

	_mapVariablesFromString: function(fileContents, group, component) {
		var orderedMap = OrderedMap();

		fileContents.replace(/(\$.*):[\s]*(.*);/g, function(match, variable, value) {
			value = _.trim(value.replace('!default', ''));

			orderedMap = orderedMap.set(variable, Map({
				component: component,
				group: group,
				name: variable,
				value: value
			}));
		});

		return orderedMap;
	}
};
