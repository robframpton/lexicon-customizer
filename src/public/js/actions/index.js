import componentScraper from '../../../../lib/component_scraper';
import createPreview from '../../../../lib/create_preview';
import sass from '../../../../lib/sass';
import themeUtil from '../../../../lib/theme';
import UserConfig from '../../../../lib/user_config';

const userConfig = new UserConfig();

export function buildLexicon() {
	return function(dispatch, getState) {
		const state = getState();

		const baseLexiconTheme = _.kebabCase(state.baseLexiconTheme);

		sass.renderLexiconBase({
			baseLexiconTheme
		}, function(err, filePath) {
			dispatch(renderPreview(state.selectedComponent));
		});
	};
};

export function createVariablesFile() {
	return function(dispatch, getState) {
		const state = getState();

		sass.writeCustomVariablesFile(state.modifiedVariables, state.theme)
			.then(function() {
				dispatch(buildLexicon());
			});
	};
};

export function renderPreview(component) {
	return function(dispatch, getState) {
		var baseLexiconTheme = getState().baseLexiconTheme;

		createPreview(getState().group, component, baseLexiconTheme)
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
		var sourceVariables = getState().sourceVariables;

		dispatch(setModifiedVariables(sourceVariables));

		var state = getState();

		sass.clearCustomVariablesFile(state.modifiedVariables, state.theme)
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
	return {
		component,
		group,
		name,
		type: 'SET_VARIABLE',
		value
	};
};
