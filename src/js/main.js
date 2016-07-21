'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {Map} from 'immutable';
import {Provider} from 'react-redux';
import {remote} from 'electron';

const {BrowserWindow} = remote;

import lexiconCustomizerReducer from '../js/reducers/index';
import Root from '../js/containers/Root';
import {buildLexicon} from '../js/actions/index';

import hydrateState from '../js/lib/system/hydrate_state';
import previewPopoutSubscriber from '../js/subscribers/preview_popout';

const initalState = Map(hydrateState());

let enhancerArgs = [applyMiddleware(thunk)];

if (process.env.NODE_ENV === 'development') {
	const DevTools = require('../js/containers/DevTools');

	enhancerArgs.push(DevTools.default.instrument());
}

const enhancer = compose.apply(null, enhancerArgs);

const store = createStore(
	lexiconCustomizerReducer,
	initalState,
	enhancer
);

previewPopoutSubscriber(store);

store.dispatch(buildLexicon());

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<Root />
		</Provider>,
		document.getElementById('main')
	);
};

render();
