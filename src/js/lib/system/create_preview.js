'use strict';

import _ from 'lodash';
import ejs from 'ejs';
import fs from 'fs';
import fsp from 'fs-promise';
import path from 'path';

const CWD = process.cwd();

const PATH_IMAGES = path.join(CWD, 'build/images');

const PATH_LEXICON = path.join(CWD, 'lexicon');

const PATH_LEXICON_IMAGES = path.join(PATH_LEXICON, 'build/images');

export default function createPreview(group, component, baseLexiconTheme, cb) {
	baseLexiconTheme = _.kebabCase(baseLexiconTheme);
	component = _.snakeCase(component);

	const cssPath = path.join(CWD, 'lexicon/build/' + baseLexiconTheme + '.css') + '?t=' + Date.now();
	const previewFilePath = path.join(CWD, 'lexicon/build/' + group + '-preview.html');

	ejs.renderFile(path.join(__dirname, '..', 'templates', 'preview.ejs'), {
		componentPreviewPath: path.join(CWD, 'lexicon/markup/lexicon', component + '.ejs'),
		iconSpritePath: path.join(PATH_LEXICON_IMAGES, 'icons', 'icons.svg'),
		imagesPath: PATH_IMAGES,
		lexiconCSSPath: cssPath,
		lexiconImagesPath: PATH_LEXICON_IMAGES,
		scripts: [
			path.join(CWD, 'bower_components/jquery/dist/jquery.js'),
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
