'use strict';

import * as fs from 'fs-extra';
import path from 'path';
import {remote} from 'electron';

const {app} = remote;

const APP_PATH = app.getAppPath();

const LEXICON_PATH = path.join(APP_PATH, 'node_modules/lexicon-ux/build');

const COMPONENTS_PATH = path.join(APP_PATH, 'build/html/components');

const USER_DATA_PATH = app.getPath('userData');

function createPreview(component, cssPath) {
	const fileName = component + '.html';

	const componentPath = path.join(COMPONENTS_PATH, fileName);

	let fileContent = fs.readFileSync(componentPath, {
		encoding: 'utf8'
	});

	const data = {
		appPath: APP_PATH,
		iconSpritePath: path.join(LEXICON_PATH, 'images/icons/icons.svg'),
		imagesPath: path.join(APP_PATH, 'build/images'),
		lexiconCssPath: cssPath,
		lexiconPath: LEXICON_PATH
	};

	fileContent = fileContent.replace(/\${([a-zA-Z]+)}/g, (match, g1) => {
		return data[g1] || match;
	});

	const filePath = path.join(USER_DATA_PATH, 'preview_markup', fileName);

	fs.outputFileSync(filePath, fileContent);

	return filePath;
}

export default createPreview;
