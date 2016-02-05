'use strict';

var _ = require('lodash');
var fs = require('fs');
var fsp = require('fs-promise');
var path = require('path');
var sass = require('node-sass');

var componentScraper = require('./component-scraper');

var CWD = process.cwd();

var PATH_BOWER_INCLUDES = path.join(CWD, 'bower_components/bourbon/app/assets/stylesheets');

var PATH_LEXICON_SCSS = path.join(CWD, 'node_modules/lexicon/src/scss');

module.exports = {
	clearCustomVariablesFile: function() {
		fs.writeFileSync(path.join(CWD, 'lexicon/_custom_variables.scss'), '');
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

	writeCustomVariablesFile: function(variableMap, themePath) {
		variableMap = this._getUniqueVariabels(variableMap);

		var variablesString = this._generateVariablesString(variableMap);

		return fsp.writeFile(path.join(CWD, 'lexicon/_custom_variables.scss'), variablesString);

		if (themePath) {
			fs.writeFileSync(path.join(themePath, 'src/css/_aui_variables.scss'), variablesString);
		}
	},

	_getUniqueVariabels: function(variableMap) {
		var baseVariables = componentScraper.mapLexiconVariables();

		return _.reduce(variableMap, function(result, item, index) {
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

	_generateVariablesString: function(variableMap, string) {
		var instance = this;

		string = string || '';

		return _.reduce(variableMap, function(result, item, index) {
			if (_.isObject(item)) {
				result += instance._generateVariablesString(item, result);
			}
			else {
				result += index + ': ' + item + ';\n'
			}

			return result
		}, string);
	}
};
