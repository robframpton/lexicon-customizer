'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.importVariables = importVariables;
exports.overrideVariables = overrideVariables;
exports.resetVariables = resetVariables;
exports.setVariable = setVariable;
exports.setVariables = setVariables;

var _component_scraper = require('../lib/system/component_scraper');

var componentScraper = _interopRequireWildcard(_component_scraper);

var _sass_util = require('../lib/system/sass_util');

var sassUtil = _interopRequireWildcard(_sass_util);

var _index = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function importVariables(filePath) {
	return function (dispatch, getState) {
		dispatch(setVariables(componentScraper.mapVariablesFromFile(filePath, 'theme')));
	};
};

function overrideVariables(variables) {
	return {
		type: 'OVERRIDE_VARIABLES',
		variables: variables
	};
};

function resetVariables() {
	return function (dispatch, getState) {
		var state = getState();

		dispatch(overrideVariables(state.get('sourceVariables')));

		sassUtil.clearCustomVariablesFile(state.get('variables'), state.get('theme')).then(function () {
			dispatch((0, _index.buildLexicon)());
		});
	};
};

function setVariable(group, component, name, value) {
	return function (dispatch, getState) {
		dispatch({
			component: component,
			group: group,
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