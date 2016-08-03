"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = function Radio(_ref) {
	var checked = _ref.checked;
	var label = _ref.label;
	var _onChange = _ref.onChange;
	var value = _ref.value;

	return _react2.default.createElement(
		"div",
		{ className: "radio" },
		_react2.default.createElement(
			"label",
			null,
			_react2.default.createElement("input", {
				checked: checked,
				onChange: function onChange(event) {
					_onChange();
				},
				type: "radio",
				value: value
			}),
			label
		)
	);
};

Radio.propTypes = {
	checked: _react.PropTypes.bool,
	label: _react.PropTypes.string.isRequired,
	onChange: _react.PropTypes.func.isRequired,
	value: _react.PropTypes.string.isRequired
};

exports.default = Radio;