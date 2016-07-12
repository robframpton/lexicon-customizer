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
import {handlePreviewPopout} from '../js/lib/preview_popout';

const initalState = Map(hydrateState());

const store = createStore(
	lexiconCustomizerReducer,
	initalState,
	applyMiddleware(thunk)
);

handlePreviewPopout(store);

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<LexiconCustomizer />
		</Provider>,
		document.getElementById('main')
	);
};

render();
