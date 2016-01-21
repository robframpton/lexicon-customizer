'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var sass = require('node-sass');

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

		this.render(options, path.join(CWD, 'lexicon/lexicon-base.scss'), function(err, result) {
			if (err) {
				console.log(err);
			}

			if (!err) {
				var cssString = result.css.toString();

				fs.writeFileSync(path.join(CWD, 'lexicon/build/lexicon-base.css'), cssString);
			}

			cb(err, result);
		});
	},

	writeCustomVariablesFile: function(variableMap, themePath) {
		var variablesString = this._generateVariablesString(variableMap);

		fs.writeFileSync(path.join(CWD, 'lexicon/_custom_variables.scss'), variablesString);

		if (themePath) {
			fs.writeFileSync(path.join(themePath, 'src/css/_aui_variables.scss'), variablesString);
		}
	},

	_generateVariablesString: function(variableMap) {
		return _.reduce(variableMap, function(result, item, index) {
			result += index + ': ' + item + ';\n'

			return result
		}, '');
	}
};
