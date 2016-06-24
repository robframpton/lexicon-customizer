'use strict';

import _ from 'lodash';
import fsp from 'fs-promise';
import path from 'path';

const PATH_LEXICON = path.join(process.cwd(), 'lexicon');

export default function createPreview(group, componentName, baseLexiconTheme) {
	componentName = _.snakeCase(componentName);

	let cssPath;
	let htmlPath = path.join(process.cwd(), 'lexicon/markup', group, componentName + '.html');

	return fsp.readFile(htmlPath, {
		encoding: 'utf8'
	}).then(function(htmlContent) {
		const imagesPath = path.join(process.cwd(), 'lexicon/images');

		htmlContent = htmlContent.replace(/{imagesPath}/g, imagesPath);

		baseLexiconTheme = _.kebabCase(baseLexiconTheme);

		cssPath = path.join(process.cwd(), 'lexicon/build/' + baseLexiconTheme + '.css') + '?t=' + Date.now();

		const header = '<html>' +
			'<head>' +
				'<link href="' + cssPath + '" id="lexiconStylesheetLink" rel="stylesheet" />' +
				'<script src="' + path.join(process.cwd(), 'bower_components/jquery/dist/jquery.js') + '"></script>' +
				'<script src="' + path.join(PATH_LEXICON, '..', 'build/js/bootstrap.js') + '"></script>' +
				'<script src="' + path.join(PATH_LEXICON, '..', 'build/js/svg4everybody.js') + '"></script>' +
			'</head>' +
			'<body class="lexicon-customizer-preview-box">' +
				'<h3>Preview</h3>';

		const footer = '</body></html>';

		htmlContent = header + htmlContent + footer;

		const htmlWritePath = path.join(process.cwd(), 'lexicon/build/' + group + '-preview.html');

		htmlPath = htmlWritePath + '?component=' + componentName;

		return fsp.writeFile(htmlWritePath, htmlContent);
	}).then(function() {
		return {
			cssPath,
			htmlPath
		}
	});
};
