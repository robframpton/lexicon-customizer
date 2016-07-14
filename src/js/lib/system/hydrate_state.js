'use strict';

import immutable from 'immutable';
import path from 'path';

import * as componentScraper from './component_scraper';
import * as varUtil from '../var_util';
import UserConfig from './user_config';

const COMPONENT_BLACKLIST = ['iconography'];

module.exports = function() {
	const userConfig = new UserConfig();

	const persistedConfig = userConfig.getConfig();

	const {sourceVariables, variables} = componentScraper.initVariables(persistedConfig.baseLexiconTheme);

	const components = varUtil.getComponentsFromVariablesMap(variables).filter((component) => {
		return !COMPONENT_BLACKLIST.includes(component);
	});

	const filePaths = immutable.Map({
		customVariables: path.join(process.cwd(), 'lexicon', '_custom_variables.scss')
	});

	const initialState = {
		baseLexiconTheme: persistedConfig.baseLexiconTheme || 'lexiconBase',
		components: components,
		filePaths: filePaths,
		sourceVariables: sourceVariables,
		selectedComponent: persistedConfig.selectedComponent,
		theme: persistedConfig.theme,
		variables: variables
	};

	return initialState;
};
