'use strict';

const _ = require('lodash');
const fsp = require('fs-promise');
const he = require('he');
const path = require('path');

const createPreview = function(componentName, baseLexiconTheme, cb) {
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
		const imagesPath = path.join(process.cwd(), 'node_modules/lexicon/src/images');

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

		const filePath = path.join(process.cwd(), 'lexicon/build/' + baseLexiconTheme + '.css');

		const linkElement = '<link rel="stylesheet" href="' + filePath + '" />'

		htmlContent = '<html><head>' + linkElement + '</head><body class="lexicon-customizer-preview-box">' + htmlContent + '</body></html>';

		const lexiconHTMLPath = path.join(process.cwd(), 'lexicon/build/lexicon-preview.html');

		returnPath = lexiconHTMLPath + '?t=' + Date.now();

		return fsp.writeFile(lexiconHTMLPath, htmlContent);

	}).then(function() {
		return returnPath;
	});
};

module.exports = createPreview;