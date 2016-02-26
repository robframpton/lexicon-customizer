'use strict';

const _ = require('lodash');
const fsp = require('fs-promise');
const he = require('he');
const path = require('path');

const createLexiconPreview = function(componentName, baseLexiconTheme) {
	let htmlContent = '';

	if (!componentName) {
		return;
	}

	let componentHTMLFileName = componentName + '.html';

	if (!fsp.exists(path.join(process.cwd(), 'node_modules/lexicon/src/content', componentHTMLFileName))) {
		componentHTMLFileName = componentHTMLFileName.replace('-', '_');
	}

	let cssPath;
	let htmlPath;

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

		const linkElement = '<link href="' + filePath + '" id="lexiconStylesheetLink" rel="stylesheet" />'

		htmlContent = '<html><head>' + linkElement + '</head><body class="lexicon-customizer-preview-box">' + htmlContent + '</body></html>';

		const lexiconHTMLPath = path.join(process.cwd(), 'lexicon/build/lexicon-preview.html');

		htmlPath = lexiconHTMLPath + '?component=' + componentName;

		cssPath = filePath + '?t=' + Date.now();

		return fsp.writeFile(lexiconHTMLPath, htmlContent);
	}).then(function() {
		return {
			cssPath,
			htmlPath
		};
	});
};

const createBootstrapPreview = function(componentName, baseLexiconTheme) {
	componentName = _.snakeCase(componentName);

	let cssPath;
	let htmlPath = path.join(process.cwd(), 'lexicon/bootstrap_markup', componentName + '.html');

	const lexiconPath = getLexiconPath();

	return fsp.readFile(htmlPath, {
		encode: 'utf8'
	}).then(function(htmlContent) {
		baseLexiconTheme = _.kebabCase(baseLexiconTheme);

		cssPath = path.join(process.cwd(), 'lexicon/build/' + baseLexiconTheme + '.css') + '?t=' + Date.now();

		const header = '<html>' +
			'<head>' +
				'<link href="' + cssPath + '" id="lexiconStylesheetLink" rel="stylesheet" />' +
				'<script src="' + path.join(process.cwd(), 'bower_components/jquery/dist/jquery.js') + '"></script>' +
				'<script src="' + path.join(lexiconPath, '..', 'build/js/bootstrap.js') + '"></script>' +
			'</head>' +
			'<body class="lexicon-customizer-preview-box">' +
				'<h3>Preview</h3>';

		const footer = '</body></html>';

		htmlContent = header + htmlContent + footer;

		const bootstrapHTMLPath = path.join(process.cwd(), 'lexicon/build/bootstrap-preview.html');

		htmlPath = bootstrapHTMLPath + '?component=' + componentName;

		return fsp.writeFile(bootstrapHTMLPath, htmlContent);
	}).then(function() {
		return {
			cssPath,
			htmlPath
		}
	});
};

const createPreview = function(group, componentName, baseLexiconTheme) {
	if (group == 'lexicon') {
		return createLexiconPreview(componentName, baseLexiconTheme);
	}
	else if (group == 'bootstrap') {
		return createBootstrapPreview(componentName, baseLexiconTheme);
	}
};

function getLexiconPath() {
	return require.resolve('lexicon');
}

module.exports = createPreview;
