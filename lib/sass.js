'use strict';

var _ = require('lodash');
var fs = require('fs');
var fsp = require('fs-promise');
var path = require('path');
var sass = require('node-sass');

var componentScraper = require('./component_scraper');

var CWD = process.cwd();

var PATH_BOWER_INCLUDES = path.join(CWD, 'bower_components/bourbon/app/assets/stylesheets');

var PATH_LEXICON_SCSS = path.join(CWD, 'lexicon/src/scss');

var sassUtil = {
	clearCustomVariablesFile: function(modifiedVariables, themePath) {
		if (themePath) {
			this.clearModifiedVariablesFromTheme(modifiedVariables, themePath);
		}

		return fsp.writeFile(path.join(CWD, 'lexicon/_custom_variables.scss'), '');
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

	writeCustomVariablesFile: function(modifiedVariables, themePath) {
		var variablesString = this._getModifiedVariablesString(modifiedVariables);

		if (themePath) {
			this._writeThemeFileTask(modifiedVariables, variablesString, themePath);
		}

		return fsp.writeFile(path.join(CWD, 'lexicon/_custom_variables.scss'), variablesString);
	},

	_clearModifiedVariablesFromFile: function(modifiedVariables, filePath) {
		var reducedVariables = this._getThemeVariables(modifiedVariables, filePath);

		return fsp.writeFile(filePath, this._generateVariablesString(reducedVariables));
	},

	_getModifiedVariablesString: function(modifiedVariables) {
		var variableMap = this._getUserVariables(modifiedVariables);

		var variablesString = this._generateVariablesString(variableMap.bootstrap);

		variablesString = variablesString.concat(this._generateVariablesString(variableMap.lexicon));

		return variablesString;
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

	_getUserVariables: function(variables) {
		var bootstrapBaseVariables = componentScraper.mapBootstrapVariables();
		var lexiconBaseVariables = componentScraper.mapLexiconVariables();

		return {
			bootstrap: this._getUniqueVariables(variables.bootstrap, bootstrapBaseVariables),
			lexicon: this._getUniqueVariables(variables.lexicon, lexiconBaseVariables)
		};
	},

	_generateVariablesString: function(variableMap) {
		var instance = this;

		return _.map(variableMap, function(item, index) {
			if (_.isObject(item)) {
				var header = '\n// ' + index + '\n\n';

				return header + instance._generateVariablesString(item);
			}
			else {
				return index + ': ' + item + ';\n'
			}
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

module.exports = sassUtil;