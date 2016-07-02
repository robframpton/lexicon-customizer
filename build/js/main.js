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

var _LexiconCustomizer = require('../js/containers/LexiconCustomizer');

var _LexiconCustomizer2 = _interopRequireDefault(_LexiconCustomizer);

var _index = require('../js/reducers/index');

var _index2 = _interopRequireDefault(_index);

var _hydrate_state = require('../js/lib/system/hydrate_state');

var _hydrate_state2 = _interopRequireDefault(_hydrate_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initalState = (0, _immutable.Map)((0, _hydrate_state2.default)());

var store = (0, _redux.createStore)(_index2.default, initalState, (0, _redux.applyMiddleware)(_reduxThunk2.default));

var render = function render() {
	_reactDom2.default.render(_react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2.default.createElement(_LexiconCustomizer2.default, null)
	), document.getElementById('main'));
};

render();