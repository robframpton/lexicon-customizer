"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Test = function Test(_ref) {
	var active = _ref.active;
	var children = _ref.children;
	var _onClick = _ref.onClick;

	if (active) {
		return _react2.default.createElement(
			"span",
			null,
			children
		);
	}

	return _react2.default.createElement(
		"a",
		{ href: "#",
			onClick: function onClick(e) {
				e.preventDefault();
				_onClick();
			}
		},
		children
	);
};

Test.propTypes = {
	active: _react.PropTypes.bool.isRequired,
	children: _react.PropTypes.node.isRequired,
	onClick: _react.PropTypes.func.isRequired
};

exports.default = Test;