'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Button = require('../../components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _preview = require('../../actions/preview');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onClick: function onClick(e) {
			dispatch((0, _preview.toggleDevTools)());
		}
	};
};

var ClearThemeButton = (0, _reactRedux.connect)(null, mapDispatchToProps)(_Button2.default);

exports.default = ClearThemeButton;