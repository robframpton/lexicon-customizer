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
	return function(dispatch, getState) {
		const state = getState();

		variables = varUtil.removeLockedVariables(variables, state.get('lockedVariables'));

		dispatch({
			type: 'OVERRIDE_VARIABLES',
			variables
		});
	}
};

export function resetComponentVariables() {
	return function(dispatch, getState) {
		if (confirm('Are you sure you want to reset the current component variables? This will erase custom variables from your theme\'s _aui_variables.scss file.')) {
			const state = getState();

			const sourceComponentVariables = varUtil.filterVariablesByComponent(state.get('sourceVariables'), state.get('selectedComponent'));

			dispatch(setVariables(sourceComponentVariables));
		}
	};
};

export function resetVariable(name) {
	return function(dispatch, getState) {
		if (confirm(`Are you sure you want to reset ${name} to it's default value?`)) {
			const state = getState();

			const sourceVariables = state.get('sourceVariables');

			dispatch(setVariable(name, sourceVariables.get(name).get('value')));
		}
	};
};

export function resetVariables() {
	return function(dispatch, getState) {
		if (confirm('Are you sure you want to reset all variables? This will also erase custom variables from your theme\'s _aui_variables.scss file.')) {
			const state = getState();

			dispatch(overwriteVariables(state.get('sourceVariables')));

			sassUtil.clearCustomVariablesFile(state.get('variables'), state.get('lexiconDirs').customDir, state.get('theme'))
				.then(function() {
					dispatch(buildLexicon());
				});
		}
	};
};

export function setVariable(name, value) {
	return (dispatch, getState) => {
		const state = getState();

		const lockedVariables = state.get('lockedVariables');

		if (lockedVariables.has(name)) {
			return;
		}

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
		const state = getState();

		variables = varUtil.removeLockedVariables(variables, state.get('lockedVariables'));

		dispatch({
			type: 'SET_VARIABLES',
			variables
		});

		dispatch(createVariablesFile());
	}
};
