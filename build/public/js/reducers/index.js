'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _baseLexiconTheme = require('./baseLexiconTheme');

var _baseLexiconTheme2 = _interopRequireDefault(_baseLexiconTheme);

var _variables = require('./variables');

var _variables2 = _interopRequireDefault(_variables);

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lexiconCustomizerReducer = (0, _redux.combineReducers)({
	baseLexiconTheme: _baseLexiconTheme2.default,
	theme: _theme2.default,
	variables: _variables2.default
});

exports.default = lexiconCustomizerReducer;