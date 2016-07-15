'use strict';

import _ from 'lodash';
import path from 'path';
import {remote} from 'electron';

const CWD = remote.app.getAppPath();

const PATH_LEXICON_MARKUP = path.join(CWD, 'build/html/components');

export default function createPreview(component, baseLexiconTheme) {
	baseLexiconTheme = _.kebabCase(baseLexiconTheme);
	component = _.snakeCase(component);

	const htmlPath = path.join(PATH_LEXICON_MARKUP, component + '.html');

	// TODO: we need to write all css files outside of the electron archive, use os module to create dir for all file writing
	const cssPath = path.join(CWD, 'lexicon/build/' + baseLexiconTheme + '.css') + '?t=' + Date.now();

	return {
		cssPath,
		htmlPath
	}
};
