"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Button = function Button(_ref) {
	var href = _ref.href;
	var label = _ref.label;
	var onClick = _ref.onClick;

	var other = _objectWithoutProperties(_ref, ["href", "label", "onClick"]);

	if (href) {
		return _react2.default.createElement(
			"a",
			_extends({}, other, {
				className: "btn btn-default",
				href: href
			}),
			label
		);
	} else {
		return _react2.default.createElement(
			"button",
			_extends({}, other, {
				className: "btn btn-default",
				onClick: onClick
			}),
			label
		);
	}
};

Button.propTypes = {
	href: _react.PropTypes.string,
	label: _react.PropTypes.string.isRequired,
	onClick: _react.PropTypes.func
};

exports.default = Button;