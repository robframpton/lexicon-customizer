'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = function Container(_ref) {
	var dispatch = _ref.dispatch;

	// here we can use dispatch to communicate with store

	return _react2.default.createElement(
		'div',
		null,
		'Text'
	);
};

Container = (0, _reactRedux.connect)()(Container);

exports.default = Container;