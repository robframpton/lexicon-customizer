'use strict';

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import {List, Map, OrderedMap} from 'immutable';

const COMPONENT_REDUCER_MAP = {
	tooltip: 'tooltips',
	type: 'typography'
};

const REGEX_BOOTSTRAP_COMPONENT_NAME = /([\w\s]+)\n/;

export function initVariables(baseTheme, lexiconDirs) {
	const {customDir, srcDir} = lexiconDirs;

	const bootstrapVariables = mapBootstrapVariables(srcDir);

	const lexiconVariables = mapLexiconVariables(srcDir);

	let variables = _mergeVariables(bootstrapVariables, lexiconVariables);

	if (baseTheme === 'atlasTheme') {
		const atlasVariables = mapAtlasVariables(srcDir);

		variables = _mergeVariables(variables, atlasVariables);
	}

	const sourceVariables = variables;

	mapCustomVariables(customDir).forEach((variable, key) => {
		if (sourceVariables.has(key)) {
			let sourceVariable = variables.get(key);

			variables = variables.set(key, sourceVariable.set('value', variable.get('value')));
		}
	});

	return {
		sourceVariables: sourceVariables,
		variables: variables
	};
};

export function mapAtlasVariables(srcDir) {
	return _mapVariablesFromComponentArray(_getAtlasThemeComponents(srcDir), path.join(srcDir, 'scss/atlas-theme/variables'), 'lexicon');
};

export function mapBootstrapVariables(srcDir) {
	return _mapBootstrapVariablesFile(srcDir);
};

export function mapCustomVariables(customDir) {
	return mapVariablesFromFile(path.join(customDir, '_custom_variables.scss'), 'custom', '');
};

export function mapThemeVariables(themePath) {
	return mapVariablesFromFile(path.join(themePath, 'src/css/_aui_variables.scss'), 'theme', '');
};

export function mapLexiconVariables(srcDir) {
	return _mapVariablesFromComponentArray(_getLexiconBaseComponents(srcDir), path.join(srcDir, 'scss/lexicon-base/variables'), 'lexicon');
};

export function mapVariablesFromFile(filePath, group, component) {
	if (!filePath || !fs.existsSync(filePath)) {
		return OrderedMap();
	}

	let fileContents = fs.readFileSync(filePath, {
		encoding: 'utf8'
	});

	return _mapVariablesFromString(fileContents, group, component);
};

export function _getAtlasThemeComponents(srcDir) {
	return _getComponentArrayFromVariablesFile(path.join(srcDir, 'scss/atlas-theme/_variables.scss'));
};

export function _getComponentArrayFromVariablesFile(filePath) {
	let fileContents = fs.readFileSync(filePath, {
		encoding: 'utf8'
	});

	let regex = /\@import\s\"variables\/(.*)\"/;

	return _.reduce(fileContents.split('\n'), function(result, item, index) {
		let match = item.match(regex);

		if (match) {
			result.push(match[1]);
		}

		return result;
	}, []);
};

export function _getLexiconBaseComponents(srcDir) {
	return _getComponentArrayFromVariablesFile(path.join(srcDir, 'scss/lexicon-base/_variables.scss'));
};

export function _getReducedComponentName(component) {
	return COMPONENT_REDUCER_MAP[component] || component;
};

export function _mapBootstrapVariablesFile(srcDir) {
	let fileContents = fs.readFileSync(path.join(srcDir, 'scss/bootstrap/_variables.scss'), {
		encoding: 'utf8'
	});

	let fileSections = fileContents.split('//== ');

	let orderedMap = OrderedMap();

	_.forEach(fileSections, function(item, index) {
		if (index == 0) {
			return;
		}

		let name = item.match(REGEX_BOOTSTRAP_COMPONENT_NAME);

		if (name && name.length) {
			let componentName = _.kebabCase(name[1]);

			orderedMap = orderedMap.merge(_mapVariablesFromString(item, 'bootstrap', componentName));
		}
	});

	return orderedMap;
};

export function _mapVariablesFromComponentArray(componentArray, variablesDir, group) {
	let orderedMap = OrderedMap();

	_.forEach(componentArray, function(item, index) {
		let fileName = '_' + item + '.scss';

		let componentVariables = mapVariablesFromFile(path.join(variablesDir, fileName), group, item);

		orderedMap = orderedMap.merge(componentVariables);
	});

	return orderedMap;
};

export function _mapVariablesFromString(fileContents, group, component) {
	let orderedMap = OrderedMap();

	fileContents.replace(/(\$.*):[\s]*(.*);/g, function(match, variable, value) {
		value = _.trim(value.replace('!default', ''));

		orderedMap = orderedMap.set(variable, Map({
			component: _getReducedComponentName(component),
			group: group,
			name: variable,
			value: value
		}));
	});

	return orderedMap;
};

export function _mergeVariables(variables, targetVariables) {
	targetVariables.forEach((tragetVariable, key) => {
		if (variables.has(key)) {
			const modifiedVariable = variables.get(key).set('value', tragetVariable.get('value'));

			variables = variables.set(key, modifiedVariable);
		}
		else {
			variables = variables.set(key, tragetVariable);
		}
	});

	return variables;
};
