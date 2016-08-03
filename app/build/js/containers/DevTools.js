'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reduxDevtoolsDockMonitor = require('redux-devtools-dock-monitor');

var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);

var _reduxDevtoolsLogMonitor = require('redux-devtools-log-monitor');

var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxDevtools = require('redux-devtools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DevTools = (0, _reduxDevtools.createDevTools)(_react2.default.createElement(
	_reduxDevtoolsDockMonitor2.default,
	{
		changePositionKey: 'ctrl-q',
		defaultIsVisible: false,
		toggleVisibilityKey: 'ctrl-d'
	},
	_react2.default.createElement(_reduxDevtoolsLogMonitor2.default, { theme: 'tomorrow' })
));

exports.default = DevTools;