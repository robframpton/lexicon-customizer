import * as componentScraper from '../lib/system/component_scraper';
import UserConfig from '../lib/system/user_config';

import {buildLexicon} from './index';
import {overwriteSourceVariables} from './sourceVariables';
import {overwriteVariables} from './variables';

const userConfig = new UserConfig();

export function setBaseLexiconTheme(value) {
	return function(dispatch, getState) {
		const lexiconDirs = getState().get('lexiconDirs');

		dispatch({
			type: 'SET_BASE_LEXICON_THEME',
			value
		});

		userConfig.setConfig('baseLexiconTheme', value);

		const {sourceVariables, variables} = componentScraper.initVariables(value, lexiconDirs);

		dispatch(overwriteSourceVariables(sourceVariables));
		dispatch(overwriteVariables(variables));

		dispatch(buildLexicon());
	};
};
