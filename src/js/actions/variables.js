import * as componentScraper from '../lib/system/component_scraper';
import * as sassUtil from '../lib/system/sass_util';
import * as varUtil from '../lib/var_util';
import {buildLexicon, createVariablesFile} from './index';

export function importVariables(filePath) {
	return function(dispatch, getState) {
		dispatch(setVariables(componentScraper.mapVariablesFromFile(filePath, 'theme')));
	}
};

export function overwriteVariables(variables) {
	return {
		type: 'OVERRIDE_VARIABLES',
		variables
	}
};

export function resetComponentVariables() {
	return function(dispatch, getState) {
		const state = getState();

		const sourceComponentVariables = varUtil.filterVariablesByComponent(state.get('sourceVariables'), state.get('selectedComponent'));

		dispatch(setVariables(sourceComponentVariables));
	};
};

export function resetVariables() {
	return function(dispatch, getState) {
		const state = getState();

		dispatch(overwriteVariables(state.get('sourceVariables')));

		sassUtil.clearCustomVariablesFile(state.get('variables'), state.get('theme'))
			.then(function() {
				dispatch(buildLexicon());
			});
	};
};

export function setVariable(name, value) {
	return (dispatch, getState) => {
		dispatch({
			name,
			type: 'SET_VARIABLE',
			value
		});

		dispatch(createVariablesFile());
	}
};

export function setVariables(variables) {
	return (dispatch, getState) => {
		dispatch({
			type: 'SET_VARIABLES',
			variables
		});

		dispatch(createVariablesFile());
	}
};
