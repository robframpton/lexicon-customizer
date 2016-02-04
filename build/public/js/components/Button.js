"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(_ref) {
	var label = _ref.label;
	var _onClick = _ref.onClick;

	return _react2.default.createElement(
		"button",
		{
			className: "btn btn-default",
			onClick: function onClick() {
				_onClick();
			}
		},
		label
	);
};

Button.propTypes = {
	label: _react.PropTypes.string.isRequired,
	onClick: _react.PropTypes.func.isRequired
};

exports.default = Button;