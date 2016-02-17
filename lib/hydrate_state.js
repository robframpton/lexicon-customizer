'use strict';

var componentScraper = require('./component_scraper');
var UserConfig = require('./user_config');

module.exports = function() {
	var userConfig = new UserConfig();
	var persistedConfig = userConfig.getConfig();

	var variables;

	if (persistedConfig.baseLexiconTheme === 'atlasTheme') {
		variables = componentScraper.mapAtlasVariables();
	}
	else {
		variables = componentScraper.mapLexiconVariables();
	}

	componentScraper.mergeCustomVariables(variables);

	return {
		baseLexiconTheme: persistedConfig.baseLexiconTheme || 'lexiconBase',
		components: componentScraper.getLexiconBaseComponents(),
		theme: persistedConfig.theme,
		variables
	};
}
