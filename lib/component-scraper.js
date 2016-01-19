'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var PATH_LEXICON = path.join(__dirname, '../node_modules/lexicon');

var PATH_ATLAS_THEME_VARIABLES = path.join(PATH_LEXICON, 'src/scss/atlas-theme/variables');

var PATH_CUSTOM_VARIABLES = path.join(process.cwd(), 'lexicon/variables');

var PATH_LEXICON_BASE_VARIABLES = path.join(PATH_LEXICON, 'src/scss/lexicon-base/variables');

module.exports = {
	getLexiconBaseComponents: function(cb) {
		var instance = this;

		fs.readdir(PATH_LEXICON_BASE_VARIABLES, function(err, files) {
			var componentData = _.mapKeys(files, function(item, index) {
				return instance._extractComponentName(item);
			});

			cb(err, componentData);
		});
	},

	getVariablesFromFile: function(fileName) {
		if (!fileName) {
			return {};
		}

		var variabelsFile = fs.readFileSync(path.join(PATH_LEXICON_BASE_VARIABLES, fileName), {
			encoding: 'utf8'
		});

		var variableMap = this._getVariableMap(variabelsFile);

		var customVariablesFilePath = path.join(PATH_CUSTOM_VARIABLES, fileName);

		if (fs.existsSync(customVariablesFilePath)) {
			var customVariablesFile = fs.readFileSync(customVariablesFilePath, {
				encoding: 'utf8'
			});

			var customVariableMap = this._getVariableMap(customVariablesFile);

			variableMap = _.assign(variableMap, customVariableMap);
		}

		return variableMap;
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
	}
};
