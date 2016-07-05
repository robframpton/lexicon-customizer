import * as componentScraper from '../lib/system/component_scraper';
import * as sassUtil from '../lib/system/sass_util';
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

export function resetVariables() {
	return function(dispatch, getState) {
		var state = getState();

		dispatch(overwriteVariables(state.get('sourceVariables')));

		sassUtil.clearCustomVariablesFile(state.get('variables'), state.get('theme'))
			.then(function() {
				dispatch(buildLexicon());
			});
	};
};

export function setVariable(group, component, name, value) {
	return (dispatch, getState) => {
		dispatch({
			component,
			group,
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
