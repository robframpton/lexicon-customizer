'use strict';

import _ from 'lodash';
import ejs from 'ejs';
import fs from 'fs';
import fsp from 'fs-promise';
import path from 'path';

const PATH_LEXICON = path.join(process.cwd(), 'lexicon');

const PATH_LEXICON_IMAGES = path.join(PATH_LEXICON, 'build/images');

export default function createPreview(group, component, baseLexiconTheme, cb) {
	baseLexiconTheme = _.kebabCase(baseLexiconTheme);
	component = _.snakeCase(component);

	const cssPath = path.join(process.cwd(), 'lexicon/build/' + baseLexiconTheme + '.css') + '?t=' + Date.now();
	const previewFilePath = path.join(process.cwd(), 'lexicon/build/' + group + '-preview.html');

	ejs.renderFile(path.join(__dirname, '..', 'templates', 'preview.ejs'), {
		componentPreviewPath: path.join(process.cwd(), 'lexicon/markup/lexicon', component + '.ejs'),
		imagesPath: PATH_LEXICON_IMAGES,
		lexiconCSSPath: cssPath,
		scripts: [
			path.join(process.cwd(), 'bower_components/jquery/dist/jquery.js'),
			path.join(PATH_LEXICON, 'build/js/bootstrap.js'),
			path.join(PATH_LEXICON, 'build/js/svg4everybody.js')
		]
	}, function(err, result) {
		if (err) {
			throw err;
		}

		fs.writeFileSync(previewFilePath, result);

		const htmlPath = previewFilePath + '?component=' + component;

		cb({
			cssPath,
			htmlPath
		});
	});
};
