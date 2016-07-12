'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {Map} from 'immutable';
import {Provider} from 'react-redux';
import {remote} from 'electron';

const {BrowserWindow} = remote;

import LexiconCustomizer from '../js/containers/LexiconCustomizer';
import lexiconCustomizerReducer from '../js/reducers/index';

import hydrateState from '../js/lib/system/hydrate_state';
import previewPopoutSubscriber from '../js/subscribers/preview_popout';

const initalState = Map(hydrateState());

const store = createStore(
	lexiconCustomizerReducer,
	initalState,
	applyMiddleware(thunk)
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
