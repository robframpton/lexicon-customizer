'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Button = require('../components/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OpenDevToolsButton = function OpenDevToolsButton(props) {
	return _react2.default.createElement(_Button2.default, {
		label: 'Open DevTools',
		onClick: function onClick(e) {
			var webview = document.getElementById('webview');

			if (webview) {
				webview.openDevTools();
			}
		}
	});
};

exports.default = OpenDevToolsButton;