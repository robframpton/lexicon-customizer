'use strict';

var _ = require('lodash');
var fs = require('fs');
var fsp = require('fs-promise');
var path = require('path');
var sass = require('node-sass');

var componentScraper = require('./component_scraper');

import * as varUtil from '../var_util';

var CWD = process.cwd();

var PATH_BOWER_INCLUDES = path.join(CWD, 'bower_components/bourbon/app/assets/stylesheets');

var PATH_CUSTOM_VARIABLES = path.join(CWD, 'lexicon/_custom_variables.scss');

var PATH_LEXICON_SCSS = path.join(CWD, 'lexicon/src/scss');

var sassUtil = {
	clearCustomVariablesFile: function(modifiedVariables, themePath) {
		if (themePath) {
			this.clearModifiedVariablesFromTheme(modifiedVariables, themePath);
		}

		return fsp.writeFile(PATH_CUSTOM_VARIABLES, '');
	},

	clearModifiedVariablesFromTheme: function(modifiedVariables, themePath) {
		this._clearModifiedVariablesFromFile(modifiedVariables, this._getThemeVariablesFileAbsolutePath(themePath));
	},

	render: function(options, filePath, cb) {
		options = _.defaults({
			file: filePath,
			includePaths: [PATH_BOWER_INCLUDES, PATH_LEXICON_SCSS]
		}, options);

		sass.render(options, cb);
	},

	renderLexiconBase: function(options, cb) {
		if (!cb) {
			cb = options;
			options = {};
		}

		var baseLexiconTheme = _.kebabCase(options.baseLexiconTheme || 'lexiconBase');

		options = _.omit(options, 'baseLexiconTheme');

		this.render(options, path.join(CWD, 'lexicon', baseLexiconTheme + '.scss'), function(err, result) {
			if (err) {
				console.log(err);
			}

			let filePath;

			if (!err) {
				var cssString = result.css.toString();

				filePath = path.join(CWD, 'lexicon/build', baseLexiconTheme + '.css');

				fs.writeFileSync(filePath, cssString);
			}

			cb(err, filePath);
		});
	},

	writeCustomVariablesFile: function(variables, sourceVariables, themePath) {
		var variablesString = this._getModifiedVariablesString(variables, sourceVariables);

		if (themePath) {
			this._writeThemeFileTask(variables, variablesString, themePath);
		}

		return fsp.writeFile(path.join(CWD, 'lexicon/_custom_variables.scss'), variablesString);
	},

	_clearModifiedVariablesFromFile: function(modifiedVariables, filePath) {
		var reducedVariables = this._getThemeVariables(modifiedVariables, filePath);

		return fsp.writeFile(filePath, this._generateVariablesString(reducedVariables));
	},

	_getModifiedVariablesString: function(variables, sourceVariables) {
		var modifiedVariables = varUtil.getModifiedVariables(variables, sourceVariables);

		return this._generateVariablesString(modifiedVariables);
	},

	_getThemeVariables: function(modifiedVariables, filePath) {
		var fileVariables = componentScraper.getVariablesFromFile(filePath);

		var flattenedVariables = componentScraper.flattenVariables(modifiedVariables);

		return _.reduce(fileVariables, function(result, item, index) {
			if (!flattenedVariables[index]) {
				result[index] = item;
			}

			return result;
		}, {});
	},

	_getUniqueVariables: function(variables, baseVariables) {
		return _.reduce(variables, function(result, item, index) {
			var baseComponentVariables = baseVariables[index];

			var obj = _.omitBy(item, function(value, name) {
				return value == baseComponentVariables[name];
			});

			if (!_.isEmpty(obj)) {
				result[index] = obj;
			}

			return result;
		}, {});
	},

	_generateVariablesString: function(modifiedVariables) {
		return modifiedVariables.toArray().map((variable, index) => {
			return variable.get('name') + ': ' + variable.get('value') + ';\n'
		}).join('');
	},

	_getThemeVariablesFileAbsolutePath: function(themePath) {
		return path.join(themePath, 'src/css/_aui_variables.scss');
	},

	_writeThemeFile: function(modifiedVariables, variablesString, themePath) {
		var themeVariables = this._getThemeVariables(modifiedVariables, this._getThemeVariablesFileAbsolutePath(themePath));

		var variablesString = variablesString + '\n' + this._generateVariablesString(themeVariables);

		fsp.writeFile(path.join(themePath, 'src/css/_aui_variables.scss'), variablesString);
	}
};

sassUtil._writeThemeFileTask = _.debounce(sassUtil._writeThemeFile, 100);

sassUtil.sass = sass;

module.exports = sassUtil;