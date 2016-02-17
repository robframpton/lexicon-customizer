'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var PATH_LEXICON = path.join(__dirname, '../node_modules/lexicon');

var PATH_ATLAS_THEME_VARIABLES = path.join(PATH_LEXICON, 'src/scss/atlas-theme/variables');

var PATH_BOOTSTRAP_VARIABLES_FILE = path.join(PATH_LEXICON, 'src/scss/bootstrap/_variables.scss');

var PATH_CUSTOM_VARIABLES = path.join(process.cwd(), 'lexicon/variables');

var PATH_LEXICON_BASE_VARIABLES = path.join(PATH_LEXICON, 'src/scss/lexicon-base/variables');

var REGEX_BOOTSTRAP_COMPONENT_NAME = /([\w\s]+)\n/;

module.exports = {
	getAtlasThemeComponents: function() {
		return this.getComponentData(PATH_ATLAS_THEME_VARIABLES);
	},

	getBootstrapComponents: function() {
		var instance = this;

		return this._reduceBootstrapVariablesFile(function(result, item, index) {
			if (index == 0) {
				return result;
			}

			var name = item.match(REGEX_BOOTSTRAP_COMPONENT_NAME);

			if (name && name.length) {
				result.push(name[1]);
			}

			return result;
		}, []);
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

	getLexiconBaseComponentData: function() {
		return this.getComponentData(PATH_LEXICON_BASE_VARIABLES);
	},

	getLexiconBaseComponents: function() {
		return Object.keys(this.getLexiconBaseComponentData());
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

	mapAtlasVariables: function() {
		var lexiconBaseVariables = this.mapLexiconVariables();

		var atlasVariables = this.mapVariables(this.getAtlasThemeComponents(), PATH_ATLAS_THEME_VARIABLES, 'atlas-theme');

		return _.merge(lexiconBaseVariables, atlasVariables);
	},

	mapBootstrapVariables: function() {
		var instance = this;

		return this._reduceBootstrapVariablesFile(function(result, item, index) {
			if (index == 0) {
				return result;
			}

			var name = item.match(REGEX_BOOTSTRAP_COMPONENT_NAME);

			if (name && name.length) {
				result[name[1]] = instance._getVariableMap(item);
			}

			return result;
		}, {});
	},

	mapThemeVariables: function(themePath) {
		return this.getVariablesFromFile(path.join(themePath, 'src/css/_aui_variables.scss'));
	},

	mapLexiconVariables: function() {
		return this.mapVariables(this.getLexiconBaseComponentData(), PATH_LEXICON_BASE_VARIABLES, 'lexicon-base');
	},

	mapVariables: function(componentData, variablesPath, namespace) {
		var instance = this;

		return _.reduce(componentData, function(result, item, index) {
			var componentVariables = instance.getVariablesFromFile(path.join(variablesPath, item));

			if (namespace) {
				if (!instance._componentVariablesMap[namespace]) {
					instance._componentVariablesMap[namespace] = {};
				}

				instance._componentVariablesMap[namespace][index] = componentVariables;
			}

			var componentObject = {};

			componentObject[index] = componentVariables;

			_.assign(result, componentObject);

			return result;
		}, {});
	},

	mergeCustomVariables: function(baseVariables) {
		var customVariables = this.getVariablesFromFile(path.join(process.cwd(), 'lexicon/_custom_variables.scss'));

		_.forEach(baseVariables, function(item, index) {
			var componentVariables = baseVariables[index];

			_.forEach(componentVariables, function(item, index) {
				let customVariable = customVariables[index];

				if (customVariable) {
					componentVariables[index] = customVariable;
				}
			});
		});

		return baseVariables;
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

	_reduceBootstrapVariablesFile: function(reducer, result) {
		var instance = this;

		var fileContents = fs.readFileSync(PATH_BOOTSTRAP_VARIABLES_FILE, {
			encoding: 'utf8'
		});

		var fileSections = fileContents.split('//== ');

		return _.reduce(fileSections, reducer, result);
	},

	_componentVariablesMap: {}
};
