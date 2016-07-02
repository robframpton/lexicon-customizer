'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getComponentsFromVariablesMap = getComponentsFromVariablesMap;
exports.getComponentVariablesMap = getComponentVariablesMap;
exports.getModifiedVariables = getModifiedVariables;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getComponentsFromVariablesMap(variablesMap) {
	var components = (0, _immutable.Map)();

	variablesMap.forEach(function (item, index) {
		var group = item.get('group');

		var list = components.has(group) ? components.get(group) : (0, _immutable.List)();

		var component = item.get('component');

		if (!list.includes(component)) {
			components = components.set(group, list.push(component));
		}
	});

	return components;
};

function getComponentVariablesMap(variablesMap, group, component) {
	return variablesMap.filter(function (variable, key) {
		return variable.get('group') === group && variable.get('component') === component;
	});
};

function getModifiedVariables(variables, sourceVariables) {
	return variables.filter(function (variable, key) {
		return variable.get('value') !== sourceVariables.get(key).get('value');
	});
};