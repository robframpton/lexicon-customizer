'use strict';

import _ from 'lodash';
import {List, Map, OrderedMap} from 'immutable';

export function getComponentsFromVariablesMap(variablesMap) {
	let components = Map();

	variablesMap.forEach((item, index) => {
		let group = item.get('group');

		let list = components.has(group) ? components.get(group) : List();

		let component = item.get('component');

		if (!list.includes(component)) {
			components = components.set(group, list.push(component));
		}
	});

	return components;
};

export function getComponentVariablesMap(variablesMap, group, component) {
	return variablesMap.filter((variable, key) => {
		return variable.get('group') === group &&  variable.get('component') === component;
	});
};

export function getModifiedVariables(variables, sourceVariables) {
	return variables.filter((variable, key) => {
		return variable.get('value') !== sourceVariables.get(key).get('value');
	});
};
