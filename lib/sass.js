'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var sass = require('node-sass');

var CWD = process.cwd();

var PATH_BOWER_INCLUDES = path.join(CWD, 'bower_components/bourbon/app/assets/stylesheets');

var PATH_LEXICON_SCSS = path.join(CWD, 'node_modules/lexicon/src/scss');

module.exports = {
	generateImportsFile: function() {
		var files = fs.readdirSync(path.join(CWD, 'lexicon/variables'));

		var imports = _.map(files, function(item, index) {
			return '@import "variables/' + path.basename(item, '.scss') + '";';
		}).join('\n');

		fs.writeFileSync(path.join(CWD, 'lexicon/_custom_variables.scss'), imports);
	},

	writeVariablesFile: function(componentName, variables) {
		fs.writeFileSync(path.join(CWD, 'lexicon/variables', '_' + componentName + '.scss'), variables);
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

		this.generateImportsFile();

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
	}
};
