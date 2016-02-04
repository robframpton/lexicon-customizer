'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var themeName = state.theme;

	if (themeName) {
		themeName = themeName.replace(/.*\/(.*)/, '$1');
	}

	return {
		themeName: themeName
	};
};

var ThemeLabel = function ThemeLabel(_ref) {
	var themeName = _ref.themeName;

	return _react2.default.createElement(
		'span',
		{ className: 'theme-label' },
		'Current Theme: ',
		themeName
	);
};

ThemeLabel = (0, _reactRedux.connect)(mapStateToProps)(ThemeLabel);

exports.default = ThemeLabel;