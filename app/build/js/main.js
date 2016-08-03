'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = require('redux');

var _immutable = require('immutable');

var _reactRedux = require('react-redux');

var _electron = require('electron');

var _hydrate_state = require('../js/lib/system/hydrate_state');

var _hydrate_state2 = _interopRequireDefault(_hydrate_state);

var _init_menu = require('../js/lib/init_menu');

var _init_menu2 = _interopRequireDefault(_init_menu);

var _index = require('../js/reducers/index');

var _index2 = _interopRequireDefault(_index);

var _preview_popout = require('../js/subscribers/preview_popout');

var _preview_popout2 = _interopRequireDefault(_preview_popout);

var _Root = require('../js/containers/Root');

var _Root2 = _interopRequireDefault(_Root);

var _index3 = require('../js/actions/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initalState = (0, _immutable.Map)((0, _hydrate_state2.default)());

var enhancerArgs = [(0, _redux.applyMiddleware)(_reduxThunk2.default)];

if (process.env.NODE_ENV === 'development') {
	var DevTools = require('../js/containers/DevTools');

	enhancerArgs.push(DevTools.default.instrument());
}

var enhancer = _redux.compose.apply(null, enhancerArgs);

var store = (0, _redux.createStore)(_index2.default, initalState, enhancer);

(0, _preview_popout2.default)(store);

(0, _init_menu2.default)(store);

store.dispatch((0, _index3.buildLexicon)());

var render = function render() {
	_reactDom2.default.render(_react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2.default.createElement(_Root2.default, null)
	), document.getElementById('main'));
};

render();