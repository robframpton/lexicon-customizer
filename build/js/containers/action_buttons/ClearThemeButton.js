'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Button = require('../../components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _theme = require('../../actions/theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		disabled: !state.get('theme')
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onClick: function onClick(e) {
			dispatch((0, _theme.setTheme)(''));
		}
	};
};

var ClearThemeButton = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Button2.default);

exports.default = ClearThemeButton;