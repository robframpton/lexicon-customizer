import * as componentScraper from '../lib/system/component_scraper';
import * as sassUtil from '../lib/system/sass_util';
import * as varUtil from '../lib/var_util';
import createPreview from '../lib/system/create_preview';
import UserConfig from '../lib/system/user_config';
import {isTheme} from '../lib/system/theme';

import {overwriteSourceVariables} from './sourceVariables';
import {overwriteVariables} from './variables';
import {showSassError} from './sassError';

const userConfig = new UserConfig();

export function buildLexicon() {
	return function(dispatch, getState) {
		const state = getState();

		const baseLexiconTheme = _.kebabCase(state.get('baseLexiconTheme'));

		sassUtil.renderLexiconBase({
			baseLexiconTheme
		}, function(err, filePath) {
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

		sassUtil.writeCustomVariablesFile(state.get('variables'), state.get('sourceVariables'), state.get('theme'))
			.then(function() {
				dispatch(buildLexicon());
			});
	};
};

export function renderPreview(component) {
	return function(dispatch, getState) {
		var state = getState();

		const preview = createPreview(component, state.get('baseLexiconTheme'));

		dispatch({
			preview,
			type: 'CREATE_PREVIEW'
		});
	};
};

export function setBaseLexiconTheme(value) {
	return function(dispatch, getState) {
		dispatch({
			type: 'SET_BASE_LEXICON_THEME',
			value
		});

		userConfig.setConfig('baseLexiconTheme', value);

		const {sourceVariables, variables} = componentScraper.initVariables(value);

		dispatch(overwriteSourceVariables(sourceVariables));
		dispatch(overwriteVariables(variables));

		dispatch(buildLexicon());
	};
};
