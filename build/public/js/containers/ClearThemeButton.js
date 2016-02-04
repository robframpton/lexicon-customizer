'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Button = require('../components/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClearThemeButton = function ClearThemeButton(_ref) {
	var dispatch = _ref.dispatch;

	return _react2.default.createElement(_Button2.default, {
		label: 'Clear Theme',
		onClick: function onClick(e) {
			dispatch({
				theme: '',
				type: 'SET_BASE_THEME'
			});
		}
	});
};

ClearThemeButton = (0, _reactRedux.connect)()(ClearThemeButton);

exports.default = ClearThemeButton;