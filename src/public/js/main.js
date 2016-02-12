'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import componentScraper from '../../../lib/component-scraper';
import LexiconCustomizer from '../js/components/LexiconCustomizer'
import lexiconCustomizerReducer from '../js/reducers/index'
import UserConfig from '../../../lib/user_config';

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

const initalState = {
	baseLexiconTheme: persistedConfig.baseLexiconTheme || 'lexiconBase',
	components: componentScraper.getLexiconBaseComponents(),
	variables
};

const store = createStore(
	lexiconCustomizerReducer,
	initalState,
	applyMiddleware(thunk)
);

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<LexiconCustomizer />
		</Provider>,
		document.getElementById('main')
	);
};

render();
