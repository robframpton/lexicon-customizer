'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {Map} from 'immutable';
import {Provider} from 'react-redux';
import {remote} from 'electron';

const {BrowserWindow} = remote;

import DevTools from '../js/containers/DevTools';
import LexiconCustomizer from '../js/containers/LexiconCustomizer';
import lexiconCustomizerReducer from '../js/reducers/index';

import hydrateState from '../js/lib/system/hydrate_state';
import previewPopoutSubscriber from '../js/subscribers/preview_popout';

const initalState = Map(hydrateState());

let enhancerArgs = [applyMiddleware(thunk)];

if (process.env.NODE_ENV !== 'production') {
	enhancerArgs.push(DevTools.instrument());
}

const enhancer = compose.apply(null, enhancerArgs);

const store = createStore(
	lexiconCustomizerReducer,
	initalState,
	enhancer
);

previewPopoutSubscriber(store);

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<LexiconCustomizer />
		</Provider>,
		document.getElementById('main')
	);
};

render();
