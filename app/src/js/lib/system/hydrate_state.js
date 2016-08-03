'use strict';

import {Set} from 'immutable';
import path from 'path';
import {remote} from 'electron';

import * as componentScraper from './component_scraper';
import * as varUtil from '../var_util';
import UserConfig from './user_config';

const COMPONENT_BLACKLIST = ['iconography'];

const APP_PATH = remote.app.getAppPath();

const WIN = remote.getCurrentWindow();

module.exports = function() {
	const userConfig = new UserConfig();

	const persistedConfig = userConfig.getConfig();

	const lexiconDirs = WIN.lexicon.dirs;

	const {sourceVariables, variables} = componentScraper.initVariables(persistedConfig.baseLexiconTheme, lexiconDirs);

	const components = varUtil.getComponentsFromVariablesMap(variables).filter((component) => {
		return !COMPONENT_BLACKLIST.includes(component);
	});

	const initialState = {
		baseLexiconTheme: persistedConfig.baseLexiconTheme || 'lexiconBase',
		components: components,
		lexiconDirs: lexiconDirs,
		lockedVariables: Set(persistedConfig.lockedVariables),
		selectedComponent: persistedConfig.selectedComponent,
		sourceVariables: sourceVariables,
		theme: persistedConfig.theme,
		variables: variables
	};

	return initialState;
};
