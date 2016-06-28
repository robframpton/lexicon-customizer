import * as sassUtil from '../lib/system/sass_util';
import componentScraper from '../lib/system/component_scraper';
import createPreview from '../lib/system/create_preview';
import themeUtil from '../lib/system/theme';
import UserConfig from '../lib/system/user_config';

const userConfig = new UserConfig();

export function buildLexicon() {
	return function(dispatch, getState) {
		const state = getState();

		const baseLexiconTheme = _.kebabCase(state.get('baseLexiconTheme'));

		sassUtil.renderLexiconBase({
			baseLexiconTheme
		}, function(err, filePath) {
			if (err) {
				dispatch(showSassError(err));
			}
			else {
				dispatch(renderPreview(state.get('selectedComponent')));
			}
		});
	};
};

export function createVariablesFile() {
	return function(dispatch, getState) {
		const state = getState();

		sassUtil.writeCustomVariablesFile(state.get('variables'), state.get('sourceVariables'), state.get('theme'))
			.then(function() {
				dispatch(buildLexicon());
			});
	};
};

export function importVariables(filePath) {
	return function(dispatch, getState) {
		let variablesMap = componentScraper.getVariablesFromFile(filePath);

		dispatch(setModifiedVariables(variablesMap));
	}
};

export function renderPreview(component) {
	return function(dispatch, getState) {
		var state = getState();

		createPreview(state.get('group'), component, state.get('baseLexiconTheme'))
			.then(function(preview) {
				dispatch({
					type: 'CREATE_PREVIEW',
					preview: preview
				});
			});
	};
};

export function resetVariables() {
	return function(dispatch, getState) {
		var state = getState();

		// TODO: reset variables
		var sourceVariables = state.get('sourceVariables');

		dispatch(setModifiedVariables(sourceVariables));

		sassUtil.clearCustomVariablesFile(state.get('variables'), state.get('theme'))
			.then(function() {
				dispatch(buildLexicon());
			});
	};
};

export function setBaseLexiconTheme(value) {
	return function(dispatch, getState) {
		dispatch({
			type: 'SET_BASE_LEXICON_THEME',
			value
		});

		userConfig.setConfig('baseLexiconTheme', value);

		dispatch(buildLexicon());
	}
};

export function setBaseTheme(theme) {
	return {
		theme,
		type: 'SET_BASE_THEME'
	};
};

export function setGroup(group) {
	return {
		group,
		type: 'SET_GROUP'
	}
};

export function setModifiedVariables(variables) {
	return {
		type: 'SET_MODIFIED_VARIABLES',
		variables
	};
};

export function setSelectedComponent(component) {
	return {
		component,
		type: 'SET_SELECTED_COMPONENT'
	};
};

export function setTheme(path) {
	return function(dispatch, getState) {
		if (!themeUtil.isTheme(path)) {
			path = '';
		}

		userConfig.setConfig('theme', path);

		dispatch({
			path,
			type: 'SET_THEME'
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

export function showSassError(errorMsg) {
	let timeout;

	return (dispatch, getState) => {
		if (timeout) {
			clearTimeout(timeout);

			timeout = null;
		}

		dispatch({
			error: errorMsg,
			type: 'SET_SASS_ERROR'
		});

		timeout = setTimeout(function() {
			dispatch({
				type: 'CLEAR_SASS_ERROR'
			});
		}, 4000);
	}
};
