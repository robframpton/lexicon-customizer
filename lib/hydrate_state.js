'use strict';

import componentScraper from './component-scraper';
import UserConfig from './user_config';

export default function() {
	const userConfig = new UserConfig();
	const persistedConfig = userConfig.getConfig();

	let variables;

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
};
