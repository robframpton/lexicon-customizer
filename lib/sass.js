'use strict';

var _ = require('lodash');
var fs = require('fs');
var fsp = require('fs-promise');
var path = require('path');
var sass = require('node-sass');

var componentScraper = require('./component_scraper');

var CWD = process.cwd();

var PATH_BOWER_INCLUDES = path.join(CWD, 'bower_components/bourbon/app/assets/stylesheets');

var PATH_LEXICON_SCSS = path.join(CWD, 'node_modules/lexicon/src/scss');

module.exports = {
	clearCustomVariablesFile: function() {
		return fsp.writeFile(path.join(CWD, 'lexicon/_custom_variables.scss'), '');
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

	writeCustomVariablesFile: function(variables, themePath) {
		var variableMap = this._getUserVariables(variables);

		var variablesString = this._generateVariablesString(variableMap.bootstrap);

		variablesString.concat(this._generateVariablesString(variableMap.lexicon));

		return fsp.writeFile(path.join(CWD, 'lexicon/_custom_variables.scss'), variablesString);

		if (themePath) {
			fsp.writeFile(path.join(themePath, 'src/css/_aui_variables.scss'), variablesString);
		}
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
				return instance._generateVariablesString(item);
			}
			else {
				return index + ': ' + item + ';\n'
			}
		}).join('');
	}
};
