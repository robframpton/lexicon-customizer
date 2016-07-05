'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.buildLexicon = buildLexicon;
exports.createVariablesFile = createVariablesFile;
exports.importVariables = importVariables;
exports.renderPreview = renderPreview;
exports.resetVariables = resetVariables;
exports.setBaseLexiconTheme = setBaseLexiconTheme;
exports.setBaseTheme = setBaseTheme;
exports.setGroup = setGroup;
exports.setSelectedComponent = setSelectedComponent;
exports.setTheme = setTheme;
exports.setVariable = setVariable;
exports.setVariables = setVariables;
exports.showSassError = showSassError;

var _sass_util = require('../lib/system/sass_util');

var sassUtil = _interopRequireWildcard(_sass_util);

var _component_scraper = require('../lib/system/component_scraper');

var componentScraper = _interopRequireWildcard(_component_scraper);

var _create_preview = require('../lib/system/create_preview');

var _create_preview2 = _interopRequireDefault(_create_preview);

var _theme = require('../lib/system/theme');

var _user_config = require('../lib/system/user_config');

var _user_config2 = _interopRequireDefault(_user_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var userConfig = new _user_config2.default();

function buildLexicon() {
	return function (dispatch, getState) {
		var state = getState();

		var baseLexiconTheme = _.kebabCase(state.get('baseLexiconTheme'));

		sassUtil.renderLexiconBase({
			baseLexiconTheme: baseLexiconTheme
		}, function (err, filePath) {
			if (err) {
				dispatch(showSassError(err));
			} else {
				dispatch(renderPreview(state.get('selectedComponent')));
			}
		});
	};
};

function createVariablesFile() {
	return function (dispatch, getState) {
		var state = getState();

		sassUtil.writeCustomVariablesFile(state.get('variables'), state.get('sourceVariables'), state.get('theme')).then(function () {
			dispatch(buildLexicon());
		});
	};
};

function importVariables(filePath) {
	return function (dispatch, getState) {
		var variablesMap = componentScraper.mapVariablesFromFile(filePath, 'theme');

		console.log(variablesMap);

		dispatch(setVariables(variablesMap));
	};
};

function renderPreview(component) {
	return function (dispatch, getState) {
		var state = getState();

		(0, _create_preview2.default)(state.get('group'), component, state.get('baseLexiconTheme'), function (preview) {
			dispatch({
				preview: preview,
				type: 'CREATE_PREVIEW'
			});

			dispatch({
				loading: false,
				type: 'SET_PREVIEW_LOADING'
			});
		});
	};
};

function resetVariables() {
	return function (dispatch, getState) {
		var state = getState();

		var variables = state.get('variables');

		dispatch(setVariables(state.get('sourceVariables')));

		sassUtil.clearCustomVariablesFile(variables, state.get('theme')).then(function () {
			dispatch(buildLexicon());
		});
	};
};

function setBaseLexiconTheme(value) {
	return function (dispatch, getState) {
		dispatch({
			type: 'SET_BASE_LEXICON_THEME',
			value: value
		});

		userConfig.setConfig('baseLexiconTheme', value);

		dispatch(buildLexicon());
	};
};

function setBaseTheme(theme) {
	return {
		theme: theme,
		type: 'SET_BASE_THEME'
	};
};

function setGroup(group) {
	return {
		group: group,
		type: 'SET_GROUP'
	};
};

function setSelectedComponent(component) {
	return {
		component: component,
		type: 'SET_SELECTED_COMPONENT'
	};
};

function setTheme(path) {
	if (!path || !(0, _theme.isTheme)(path)) {
		path = '';
	}

	userConfig.setConfig('theme', path);

	return {
		path: path,
		type: 'SET_THEME'
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

		dispatch(createVariablesFile());
	};
};

function setVariables(variables) {
	return {
		type: 'SET_VARIABLES',
		variables: variables
	};
};

function showSassError(errorMsg) {
	var timeout = void 0;

	return function (dispatch, getState) {
		if (timeout) {
			clearTimeout(timeout);

			timeout = null;
		}

		dispatch({
			error: errorMsg,
			type: 'SET_SASS_ERROR'
		});

		timeout = setTimeout(function () {
			dispatch({
				type: 'CLEAR_SASS_ERROR'
			});
		}, 4000);
	};
};