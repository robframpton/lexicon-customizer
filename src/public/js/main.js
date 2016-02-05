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

let userConfig = new UserConfig();


let lexiconBaseVariables = componentScraper.mapLexiconVariables();

componentScraper.mergeCustomVariables(lexiconBaseVariables);

const initalState = {
	components: componentScraper.getLexiconBaseComponents(),
	variables: lexiconBaseVariables
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
