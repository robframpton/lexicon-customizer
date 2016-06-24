'use strict';

var immutable = require('immutable');

import * as varUtil from '../var_util';

var componentScraper = require('./component_scraper');
var UserConfig = require('./user_config');

module.exports = function() {
	var userConfig = new UserConfig();
	var persistedConfig = userConfig.getConfig();

	var lexiconVariables;

	if (persistedConfig.baseLexiconTheme === 'atlasTheme') {
		lexiconVariables = componentScraper.mapAtlasVariables();
	}
	else {
		lexiconVariables = componentScraper.mapLexiconVariables();
	}

	var bootstrapVariables = componentScraper.mapBootstrapVariables();

	var variables = bootstrapVariables.merge(lexiconVariables);

	var components = varUtil.getComponentsFromVariablesMap(variables);

	var initialState = {
		baseLexiconTheme: persistedConfig.baseLexiconTheme || 'lexiconBase',
		components: components,
		sourceVariables: variables,
		theme: persistedConfig.theme,
		variables: variables
	};

	return initialState;
};
