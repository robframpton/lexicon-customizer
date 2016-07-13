'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _ColorPickerPanel = require('../components/ColorPickerPanel');

var _ColorPickerPanel2 = _interopRequireDefault(_ColorPickerPanel);

var _colorVariableName = require('../actions/colorVariableName');

var _variables = require('../actions/variables');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var colorVariableName = state.get('colorVariableName');
	var variables = state.get('variables');

	var value = void 0;

	if (variables.has(colorVariableName)) {
		value = variables.get(colorVariableName).get('value');
	}

	return {
		name: colorVariableName,
		value: value,
		variables: variables
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onChange: function onChange(value, name) {
			dispatch((0, _variables.setVariable)(name, value));
		},
		onClose: function onClose(event) {
			dispatch((0, _colorVariableName.setColorVariableName)(null));
		}
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ColorPickerPanel2.default);