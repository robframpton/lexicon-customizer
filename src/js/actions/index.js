import * as componentScraper from '../lib/system/component_scraper';
import * as sassUtil from '../lib/system/sass_util';
import * as varUtil from '../lib/var_util';
import createPreview from '../lib/system/create_preview';
import UserConfig from '../lib/system/user_config';
import {isTheme} from '../lib/system/theme';
import {overwriteVariables} from './variables';

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

export function overwriteSourceVariables(variables) {
	return (dispatch, getState) => {
		dispatch({
			type: 'OVERWRITE_SOURCE_VARIABLES',
			variables
		});

		dispatch(setComponents(varUtil.getComponentsFromVariablesMap(variables)));
	};
};

export function renderPreview(component) {
	return function(dispatch, getState) {
		var state = getState();

		createPreview(state.get('group'), component, state.get('baseLexiconTheme'), function(preview) {
			dispatch({
				preview,
				type: 'CREATE_PREVIEW'
			});

			dispatch({
				loading: false,
				type: 'SET_PREVIEW_LOADING'
			});
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

		const {sourceVariables, variables} = componentScraper.initVariables(value);

		dispatch(overwriteSourceVariables(sourceVariables));
		dispatch(overwriteVariables(variables));

		dispatch(buildLexicon());
	};
};

export function setBaseTheme(theme) {
	return {
		theme,
		type: 'SET_BASE_THEME'
	};
};

export function setComponents(components) {
	return {
		components,
		type: 'SET_COMPONENTS'
	}
};

export function setGroup(group) {
	return {
		group,
		type: 'SET_GROUP'
	}
};

export function setSelectedComponent(component) {
	return {
		component,
		type: 'SET_SELECTED_COMPONENT'
	};
};

export function setTheme(path) {
	if (!path || !isTheme(path)) {
		path = '';
	}

	userConfig.setConfig('theme', path);

	return {
		path,
		type: 'SET_THEME'
	};
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
