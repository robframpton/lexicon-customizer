'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var PATH_LEXICON = path.join(__dirname, '../node_modules/lexicon');

var PATH_ATLAS_THEME_VARIABLES = path.join(PATH_LEXICON, 'src/scss/atlas-theme/variables');

var PATH_CUSTOM_VARIABLES = path.join(process.cwd(), 'lexicon/variables');

var PATH_LEXICON_BASE_VARIABLES = path.join(PATH_LEXICON, 'src/scss/lexicon-base/variables');

module.exports = {
	getAtlasThemeComponents: function() {
		return this.getComponentData(PATH_ATLAS_THEME_VARIABLES);
	},

	getComponentData: function(variablesFolderPath) {
		var instance = this;

		var files = [];

		try {
			files = fs.readdirSync(variablesFolderPath);
		}
		catch (e) {
		}

		var componentData = _.mapKeys(files, function(item, index) {
			return instance._extractComponentName(item);
		});

		return componentData;
	},

	getComponentVariables: function(componentName, namespace) {
		return _.get(this._componentVariablesMap, namespace + '.' + componentName);
	},

	getLexiconBaseComponents: function() {
		return this.getComponentData(PATH_LEXICON_BASE_VARIABLES);
	},

	getVariablesFromFile: function(filePath) {
		if (!filePath || !fs.existsSync(filePath)) {
			return {};
		}

		var fileContents = fs.readFileSync(filePath, {
			encoding: 'utf8'
		});

		var variableMap = this._getVariableMap(fileContents);

		return variableMap;
	},

	mapBootstrapVariables: function() {
		return this.getVariablesFromFile(path.join(PATH_LEXICON, 'src/scss/bootstrap/_variables.scss'));
	},

	mapThemeVariables: function(themePath) {
		return this.getVariablesFromFile(path.join(themePath, 'src/css/_aui_variables.scss'));
	},

	mapLexiconVariables: function() {
		return this.mapVariables(this.getLexiconBaseComponents(), 'lexicon-base');
	},

	mapVariables: function(componentData, namespace) {
		var instance = this;

		return _.reduce(componentData, function(result, item, index) {
			var componentVariables = instance.getVariablesFromFile(path.join(PATH_LEXICON_BASE_VARIABLES, item));

			if (namespace) {
				if (!instance._componentVariablesMap[namespace]) {
					instance._componentVariablesMap[namespace] = {};
				}

				instance._componentVariablesMap[namespace][index] = componentVariables;
			}

			_.assign(result, componentVariables);

			return result;
		}, {});
	},

	_extractComponentName: function(fileName) {
		return fileName.replace(/_(.*)\.scss/, '$1');
	},

	_getVariableMap: function(fileContents) {
		var variableMap = {};

		fileContents.replace(/(\$.*):[\s]*(.*);/g, function(match, variable, value) {
			value = _.trim(value.replace('!default', ''));

			variableMap[variable] = value;
		});

		return variableMap;
	},

	_componentVariablesMap: {}
};
