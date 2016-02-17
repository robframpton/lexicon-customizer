'use strict';

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

	var variables = {
		bootstrap: componentScraper.mapBootstrapVariables(),
		lexicon: componentScraper.mergeCustomVariables(lexiconVariables)
	};

	return {
		baseLexiconTheme: persistedConfig.baseLexiconTheme || 'lexiconBase',
		bootstrapComponents: componentScraper.getBootstrapComponents(),
		components: componentScraper.getLexiconBaseComponents(),
		theme: persistedConfig.theme,
		variables
	};
}
