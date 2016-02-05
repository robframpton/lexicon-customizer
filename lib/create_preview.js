'use strict';

var _ = require('lodash');
var fsp = require('fs-promise');
var he = require('he');
var path = require('path');

var createPreview = function(componentName, baseLexiconTheme, cb) {
	let htmlContent = '';

	if (!componentName) {
		return;
	}

	let componentHTMLFileName = componentName + '.html';

	if (!fsp.exists(path.join(process.cwd(), 'node_modules/lexicon/src/content', componentHTMLFileName))) {
		componentHTMLFileName = componentHTMLFileName.replace('-', '_');
	}

	let returnPath;

	return fsp.readFile(path.join(process.cwd(), 'node_modules/lexicon/src/content', componentHTMLFileName), {
		encoding: 'utf8'
	}).then(function(htmlContent) {
		var imagesPath = path.join(process.cwd(), 'node_modules/lexicon/src/images');

		htmlContent = htmlContent.replace(/\.\.\/\.\.\/images/g, imagesPath);
		htmlContent = htmlContent.replace(/{{rootPath}}\/images/g, imagesPath);
		htmlContent = htmlContent.replace(/\`\`\`([\s\S]+?)\`\`\`/gi, function(match, group) {
			if (group) {
				return he.encode(group, {
					useNamedReferences: true
				});
			}

			return '';
		});
		htmlContent = htmlContent.replace(/(---[\s\S]+---)/, '<h3>Preview</h3>');

		baseLexiconTheme = _.kebabCase(baseLexiconTheme);

		var filePath = path.join(process.cwd(), 'lexicon/build/' + baseLexiconTheme + '.css');

		var linkElement = '<link rel="stylesheet" href="' + filePath + '" />'

		htmlContent = '<html><head>' + linkElement + '</head><body class="lexicon-customizer-preview-box">' + htmlContent + '</body></html>';

		let lexiconHTMLPath = path.join(process.cwd(), 'lexicon/build/lexicon-preview.html');
		returnPath = lexiconHTMLPath + '?t=' + Date.now();

		return fsp.writeFile(lexiconHTMLPath, htmlContent);

	}).then(function() {
		return returnPath;
	});
}

module.exports = createPreview;