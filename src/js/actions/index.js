import _ from 'lodash';
import path from 'path';
import {remote} from 'electron';

import * as componentScraper from '../lib/system/component_scraper';
import * as sassUtil from '../lib/system/sass_util';
import * as varUtil from '../lib/var_util';
import UserConfig from '../lib/system/user_config';
import {isTheme} from '../lib/system/theme';

import {overwriteSourceVariables} from './sourceVariables';
import {overwriteVariables} from './variables';
import {showSassError} from './sassError';

const APP_PATH = remote.app.getAppPath();

const userConfig = new UserConfig();

export function buildLexicon() {
	return function(dispatch, getState) {
		const state = getState();

		const baseLexiconTheme = _.kebabCase(state.get('baseLexiconTheme'));
		const lexiconDirs = state.get('lexiconDirs');

		sassUtil.renderLexiconBase(baseLexiconTheme, lexiconDirs, (err, filePath) => {
			if (err) {
				dispatch(showSassError(err));
			}
			else {
				dispatch(renderPreview(state.get('selectedComponent')));
			}
		});
	};
};

export function createVariablesFile() {
	return function(dispatch, getState) {
		const state = getState();

		const {customDir} = state.get('lexiconDirs');

		sassUtil.writeCustomVariablesFile(state.get('variables'), state.get('sourceVariables'), customDir, state.get('theme'))
			.then(function() {
				dispatch(buildLexicon());
			});
	};
};

export function renderPreview(component) {
	return function(dispatch, getState) {
		var state = getState();

		const baseLexiconTheme = _.kebabCase(state.get('baseLexiconTheme'));
		const {customDir} = state.get('lexiconDirs');

		const htmlPath = path.join(APP_PATH, 'build/html/components', _.snakeCase(component) + '.html');
		const cssPath = path.join(customDir, baseLexiconTheme + '.css?t=' + Date.now());

		const preview = {
			cssPath,
			htmlPath
		};

		dispatch({
			preview,
			type: 'SET_PREVIEW'
		});
	};
};
