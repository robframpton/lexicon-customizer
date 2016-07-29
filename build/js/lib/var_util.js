'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.filterVariablesByComponent = filterVariablesByComponent;
exports.filterVariablesByGroup = filterVariablesByGroup;
exports.getComponentsFromVariablesMap = getComponentsFromVariablesMap;
exports.getModifiedVariables = getModifiedVariables;
exports.removeLockedVariables = removeLockedVariables;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterVariablesByComponent(variables, component) {
	return variables.filter(function (variable, key) {
		return variable.get('component') === component;
	});
};

function filterVariablesByGroup(variables, group) {
	return variables.filter(function (variable, key) {
		return variable.get('group') === group;
	});
};

function getComponentsFromVariablesMap(variablesMap) {
	var components = (0, _immutable.List)();

	variablesMap.forEach(function (item, index) {
		var component = item.get('component');

		if (!components.includes(component)) {
			components = components.push(component);
		}
	});

	return components;
};

function getModifiedVariables(variables, sourceVariables) {
	return variables.filter(function (variable, key) {
		return variable.get('value') !== sourceVariables.get(key).get('value');
	});
};

function removeLockedVariables(variables, lockedVariables) {
	if (!lockedVariables || lockedVariables.isEmpty()) {
		return variables;
	}

	return variables.filter(function (variable, key) {
		return !lockedVariables.has(key);
	});
};