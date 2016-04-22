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

	var bootstrapVariables = componentScraper.mapBootstrapVariables();

	var sourceVariables = {
		bootstrap: _.cloneDeep(bootstrapVariables),
		lexicon: _.cloneDeep(lexiconVariables)
	};

	var modifiedVariables = {
		bootstrap: componentScraper.mergeCustomVariables(bootstrapVariables),
		lexicon: componentScraper.mergeCustomVariables(lexiconVariables)
	};

	console.log(sourceVariables);

	return {
		baseLexiconTheme: persistedConfig.baseLexiconTheme || 'lexiconBase',
		bootstrapComponents: componentScraper.getBootstrapComponents(),
		components: componentScraper.getLexiconBaseComponents(),
		modifiedVariables: modifiedVariables,
		sourceVariables: sourceVariables,
		theme: persistedConfig.theme
	};
};
