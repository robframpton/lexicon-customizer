'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import componentScraper from '../../../lib/component-scraper';
import LexiconCustomizer from '../js/components/LexiconCustomizer'
import lexiconCustomizerReducer from '../js/reducers/index'
import UserConfig from '../../../lib/user_config';

let userConfig = new UserConfig();

let initalState = {
	components: componentScraper.getLexiconBaseComponents(),
	variables: componentScraper.mapLexiconVariables()
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
