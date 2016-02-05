import componentScraper from '../../../../lib/component-scraper';
import createPreview from '../../../../lib/create_preview';
import sass from '../../../../lib/sass';
import themeUtil from '../../../../lib/theme';
import UserConfig from '../../../../lib/user_config';

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
	return function (dispatch, getState) {
		const state = getState();

		sass.writeCustomVariablesFile(state.variables, state.theme)
			.then(function() {
				dispatch(buildLexicon());
			});
	};
};

export function renderPreview(component) {
	return function (dispatch, getState) {
		var baseLexiconTheme = getState().baseLexiconTheme;
		createPreview(component, baseLexiconTheme)
			.then(function(url) {
				dispatch({
					type: 'CREATE_PREVIEW',
					url: url
				});
			});
	};
};

export function resetVariables(variables) {
	return {
		type: 'RESET_VARIABLES',
		variables
	};
};

export function setBaseLexiconTheme(value) {
	return {
		type: 'SET_BASE_LEXICON_THEME',
		value
	};
};

export function setBaseTheme(theme) {
	return {
		theme,
		type: 'SET_BASE_THEME'
	};
};

export function setSelectedComponent(component) {
	return {
		component,
		type: 'SET_SELECTED_COMPONENT'
	};
};

export function setVariable(component, name, value) {
	return {
		component,
		name,
		type: 'SET_VARIABLE',
		value
	};
};
