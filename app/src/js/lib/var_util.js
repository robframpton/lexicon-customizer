'use strict';

import _ from 'lodash';
import {List, Map, OrderedMap} from 'immutable';

const regexDarken = /darken\((.*),(.*)\)/;

const regexLighten = /lighten\((.*),(.*)\)/;

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

export function resolveValue(name, value, variables) {
	if (variables.has(value)) {
		let resolvedValue = variables.get(value).get('value');

		return resolveValue(name, resolvedValue, variables);
	}
	else if (regexDarken.test(value)) {
		value = _resolveSassColor(name, value, variables, true);
	}
	else if (regexLighten.test(value)) {
		value = _resolveSassColor(name, value, variables, false);
	}

	return value;
};

export function _adjustColor(color, percentage) {
	let pound = false;

	if (color[0] == '#') {
		color = color.slice(1);
		pound = true;
	}

	let num = parseInt(color, 16);

	let r = _normalizeRGBAValue((num >> 16) + percentage);
	let b = _normalizeRGBAValue(((num >> 8) & 0x00FF) + percentage);
	let g = _normalizeRGBAValue((num & 0x0000FF) + percentage);

	return (pound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};

export function _resolveSassColor(name, value, variables, darken) {
	let regex = darken ? regexDarken : regexLighten;

	let match = value.match(regex);

	let color = match[1];

	if (color.indexOf('$') > -1) {
		color = resolveValue(name, color, variables);
	}

	let percentage = parseInt(match[2]);

	if (darken) {
		percentage = percentage * -1;
	}

	return _adjustColor(color, percentage);
};

export function _normalizeRGBAValue(value) {
	if (value > 255) {
		value = 255;
	}
	else if (value < 0) {
		value = 0;
	}

	return value;
};
