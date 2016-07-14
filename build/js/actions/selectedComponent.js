'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setSelectedComponent = setSelectedComponent;

var _user_config = require('../lib/system/user_config');

var _user_config2 = _interopRequireDefault(_user_config);

var _colorVariableName = require('../actions/colorVariableName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userConfig = new _user_config2.default();

function setSelectedComponent(component) {
	return function (dispatch, getState) {
		userConfig.setConfig('selectedComponent', component);

		dispatch((0, _colorVariableName.setColorVariableName)(null));

		dispatch({
			component: component,
			type: 'SET_SELECTED_COMPONENT'
		});
	};
};