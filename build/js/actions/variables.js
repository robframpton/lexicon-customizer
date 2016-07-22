'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.importVariables = importVariables;
exports.overwriteVariables = overwriteVariables;
exports.resetComponentVariables = resetComponentVariables;
exports.resetVariable = resetVariable;
exports.resetVariables = resetVariables;
exports.setVariable = setVariable;
exports.setVariables = setVariables;

var _component_scraper = require('../lib/system/component_scraper');

var componentScraper = _interopRequireWildcard(_component_scraper);

var _sass_util = require('../lib/system/sass_util');

var sassUtil = _interopRequireWildcard(_sass_util);

var _var_util = require('../lib/var_util');

var varUtil = _interopRequireWildcard(_var_util);

var _index = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function importVariables(filePath) {
	return function (dispatch, getState) {
		dispatch(setVariables(componentScraper.mapVariablesFromFile(filePath, 'theme')));
	};
};

function overwriteVariables(variables) {
	return {
		type: 'OVERRIDE_VARIABLES',
		variables: variables
	};
};

function resetComponentVariables() {
	return function (dispatch, getState) {
		var state = getState();

		var sourceComponentVariables = varUtil.filterVariablesByComponent(state.get('sourceVariables'), state.get('selectedComponent'));

		dispatch(setVariables(sourceComponentVariables));
	};
};

function resetVariable(name) {
	return function (dispatch, getState) {
		var state = getState();

		var sourceVariables = state.get('sourceVariables');

		dispatch(setVariable(name, sourceVariables.get(name).get('value')));
	};
};

function resetVariables() {
	return function (dispatch, getState) {
		var state = getState();

		dispatch(overwriteVariables(state.get('sourceVariables')));

		sassUtil.clearCustomVariablesFile(state.get('variables'), state.get('lexiconDirs').customDir, state.get('theme')).then(function () {
			dispatch((0, _index.buildLexicon)());
		});
	};
};

function setVariable(name, value) {
	return function (dispatch, getState) {
		dispatch({
			name: name,
			type: 'SET_VARIABLE',
			value: value
		});

		dispatch((0, _index.createVariablesFile)());
	};
};

function setVariables(variables) {
	return function (dispatch, getState) {
		dispatch({
			type: 'SET_VARIABLES',
			variables: variables
		});

		dispatch((0, _index.createVariablesFile)());
	};
};