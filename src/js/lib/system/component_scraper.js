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

export function mapAtlasVariables() {
	var lexiconBaseVariables = mapLexiconVariables();

	var atlasVariables = _mapVariablesFromComponentArray(_getAtlasThemeComponents(), PATH_ATLAS_THEME_VARIABLES, 'lexicon');

	return lexiconBaseVariables.merge(atlasVariables);
};

export function mapBootstrapVariables() {
	return _mapBootstrapVariablesFile();
};

export function mapThemeVariables(themePath) {
	return mapVariablesFromFile(path.join(themePath, 'src/css/_aui_variables.scss'), 'theme', '');
};

export function mapLexiconVariables() {
	return _mapVariablesFromComponentArray(_getLexiconBaseComponents(), PATH_LEXICON_BASE_VARIABLES, 'lexicon');
};

export function mapVariablesFromFile(filePath, group, component) {
	if (!filePath || !fs.existsSync(filePath)) {
		return OrderedMap();
	}

	var fileContents = fs.readFileSync(filePath, {
		encoding: 'utf8'
	});

	return _mapVariablesFromString(fileContents, group, component);
};

export function _getAtlasThemeComponents() {
	return _getComponentArrayFromVariablesFile(PATH_ATLAS_THEME_VARIABLES_FILE);
};

export function _getComponentArrayFromVariablesFile(filePath) {
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
};

export function _getLexiconBaseComponents() {
	return _getComponentArrayFromVariablesFile(PATH_LEXICON_BASE_VARIABLES_FILE);
};

export function _mapBootstrapVariablesFile() {
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
			orderedMap = orderedMap.merge(_mapVariablesFromString(item, 'bootstrap', name[1]));
		}
	});

	return orderedMap;
};

export function _mapVariablesFromComponentArray(componentArray, variablesDir, group) {
	var orderedMap = OrderedMap();

	_.forEach(componentArray, function(item, index) {
		var fileName = '_' + item + '.scss';

		var componentVariables = mapVariablesFromFile(path.join(variablesDir, fileName), group, item);

		orderedMap = orderedMap.merge(componentVariables);
	});

	return orderedMap;
};

export function _mapVariablesFromString(fileContents, group, component) {
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
};
