'use strict';

import immutable from 'immutable';

import * as componentScraper from './component_scraper';
import * as varUtil from '../var_util';
import UserConfig from './user_config';

module.exports = function() {
	let userConfig = new UserConfig();
	let persistedConfig = userConfig.getConfig();

	let lexiconVariables;

	if (persistedConfig.baseLexiconTheme === 'atlasTheme') {
		lexiconVariables = componentScraper.mapAtlasVariables();
	}
	else {
		lexiconVariables = componentScraper.mapLexiconVariables();
	}

	let bootstrapVariables = componentScraper.mapBootstrapVariables();

	let variables = bootstrapVariables.merge(lexiconVariables);

	let components = varUtil.getComponentsFromVariablesMap(variables);

	const initialState = {
		baseLexiconTheme: persistedConfig.baseLexiconTheme || 'lexiconBase',
		components: components,
		sourceVariables: variables,
		theme: persistedConfig.theme,
		variables: variables
	};

	return initialState;
};
