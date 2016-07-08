'use strict';

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import {List, Map, OrderedMap} from 'immutable';

const COMPONENT_REDUCER_MAP = {
	tooltip: 'tooltips',
	type: 'typography'
};

const PATH_LEXICON = path.join(process.cwd(), 'lexicon');

const PATH_ATLAS_THEME_VARIABLES = path.join(PATH_LEXICON, 'src/scss/atlas-theme/variables');

const PATH_ATLAS_THEME_VARIABLES_FILE = path.join(PATH_LEXICON, 'src/scss/atlas-theme/_variables.scss');

const PATH_BOOTSTRAP_VARIABLES_FILE = path.join(PATH_LEXICON, 'src/scss/bootstrap/_variables.scss');

const PATH_CUSTOM_VARIABLES_FILE = path.join(PATH_LEXICON, '_custom_variables.scss');

const PATH_LEXICON_BASE_VARIABLES = path.join(PATH_LEXICON, 'src/scss/lexicon-base/variables');

const PATH_LEXICON_BASE_VARIABLES_FILE = path.join(PATH_LEXICON, 'src/scss/lexicon-base/_variables.scss');

const REGEX_BOOTSTRAP_COMPONENT_NAME = /([\w\s]+)\n/;

export function initVariables(baseTheme) {
	const bootstrapVariables = mapBootstrapVariables();

	const lexiconVariables = mapLexiconVariables();

	let variables = _mergeVariables(bootstrapVariables, lexiconVariables);

	if (baseTheme === 'atlasTheme') {
		const atlasVariables = mapAtlasVariables();

		variables = _mergeVariables(variables, atlasVariables);
	}

	const sourceVariables = variables;

	mapCustomVariables().forEach((variable, key) => {
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

export function mapAtlasVariables() {
	return _mapVariablesFromComponentArray(_getAtlasThemeComponents(), PATH_ATLAS_THEME_VARIABLES, 'lexicon');
};

export function mapBootstrapVariables() {
	return _mapBootstrapVariablesFile();
};

export function mapCustomVariables() {
	return mapVariablesFromFile(PATH_CUSTOM_VARIABLES_FILE, 'custom', '');
};

export function mapThemeVariables(themePath) {
	return mapVariablesFromFile(path.join(themePath, 'src/css/_aui_variables.scss'), 'theme', '');
};

export function mapLexiconVariables() {
	return _mapVariablesFromComponentArray(_getLexiconBaseComponents(), PATH_LEXICON_BASE_VARIABLES, 'lexicon');
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

export function _getAtlasThemeComponents() {
	return _getComponentArrayFromVariablesFile(PATH_ATLAS_THEME_VARIABLES_FILE);
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

export function _getLexiconBaseComponents() {
	return _getComponentArrayFromVariablesFile(PATH_LEXICON_BASE_VARIABLES_FILE);
};

export function _getReducedComponentName(component) {
	return COMPONENT_REDUCER_MAP[component] || component;
};

export function _mapBootstrapVariablesFile() {
	let fileContents = fs.readFileSync(PATH_BOOTSTRAP_VARIABLES_FILE, {
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
