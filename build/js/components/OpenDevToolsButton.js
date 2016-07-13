'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Button = require('../components/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OpenDevToolsButton = function OpenDevToolsButton(props) {
	return _react2.default.createElement(_Button2.default, _extends({
		onClick: function onClick(e) {
			var webview = document.getElementById('webview');

			if (webview) {
				webview.openDevTools();
			}
		}

	}, props));
};

exports.default = OpenDevToolsButton;