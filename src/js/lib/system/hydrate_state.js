'use strict';

import immutable from 'immutable';
import path from 'path';

import * as componentScraper from './component_scraper';
import * as varUtil from '../var_util';
import UserConfig from './user_config';

module.exports = function() {
	const userConfig = new UserConfig();

	const persistedConfig = userConfig.getConfig();

	let lexiconVariables;

	if (persistedConfig.baseLexiconTheme === 'atlasTheme') {
		lexiconVariables = componentScraper.mapAtlasVariables();
	}
	else {
		lexiconVariables = componentScraper.mapLexiconVariables();
	}

	const bootstrapVariables = componentScraper.mapBootstrapVariables();

	const customVariables = componentScraper.mapCustomVariables();

	let variables = bootstrapVariables.merge(lexiconVariables);

	const sourceVariable = variables;

	customVariables.forEach((variable, key) => {
		let sourceVariable = variables.get(key);

		variables = variables.set(key, sourceVariable.set('value', variable.get('value')));
	});

	const components = varUtil.getComponentsFromVariablesMap(variables);

	const filePaths = immutable.Map({
		customVariables: path.join(process.cwd(), 'lexicon', '_custom_variables.scss')
	});

	const initialState = {
		baseLexiconTheme: persistedConfig.baseLexiconTheme || 'lexiconBase',
		components: components,
		filePaths: filePaths,
		sourceVariables: sourceVariable,
		theme: persistedConfig.theme,
		variables: variables
	};

	return initialState;
};
