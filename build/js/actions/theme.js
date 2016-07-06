'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setTheme = setTheme;

var _user_config = require('../lib/system/user_config');

var _user_config2 = _interopRequireDefault(_user_config);

var _theme = require('../lib/system/theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userConfig = new _user_config2.default();

function setTheme(path) {
	if (!path || !(0, _theme.isTheme)(path)) {
		path = '';
	}

	userConfig.setConfig('theme', path);

	return {
		path: path,
		type: 'SET_THEME'
	};
};