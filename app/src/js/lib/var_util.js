'use strict';

import _ from 'lodash';
import {List, Map, OrderedMap} from 'immutable';

export function filterVariablesByComponent(variables, component) {
	return variables.filter((variable, key) => {
		return variable.get('component') === component;
	});
};

export function filterVariablesByGroup(variables, group) {
	return variables.filter((variable, key) => {
		return variable.get('group') === group;
	});
};

export function getComponentsFromVariablesMap(variablesMap) {
	let components = List();

	variablesMap.forEach((item, index) => {
		let component = item.get('component');

		if (!components.includes(component)) {
			components = components.push(component);
		}
	});

	return components;
};

export function getInheritableVariables(variableName, variables, sourceVariables) {
	let inheritableVariables = variables.takeUntil((variable, key) => {
		return key === variableName;
	});

	inheritableVariables = getModifiedVariables(inheritableVariables, sourceVariables);

	return inheritableVariables;
};

export function getModifiedVariables(variables, sourceVariables) {
	return variables.filter((variable, key) => {
		return variable.get('value') !== sourceVariables.get(key).get('value');
	});
};

export function removeLockedVariables(variables, lockedVariables) {
	if (!lockedVariables || lockedVariables.isEmpty()) {
		return variables;
	}

	return variables.filter((variable, key) => {
		return !lockedVariables.has(key);
	});
};
