'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setSelectedComponent = setSelectedComponent;

var _user_config = require('../lib/system/user_config');

var _user_config2 = _interopRequireDefault(_user_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userConfig = new _user_config2.default();

function setSelectedComponent(component) {
	userConfig.setConfig('selectedComponent', component);

	return {
		component: component,
		type: 'SET_SELECTED_COMPONENT'
	};
};