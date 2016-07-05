'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.buildLexicon = buildLexicon;
exports.createVariablesFile = createVariablesFile;
exports.overwriteSourceVariables = overwriteSourceVariables;
exports.renderPreview = renderPreview;
exports.setBaseLexiconTheme = setBaseLexiconTheme;
exports.setBaseTheme = setBaseTheme;
exports.setComponents = setComponents;
exports.setGroup = setGroup;
exports.setSelectedComponent = setSelectedComponent;
exports.setTheme = setTheme;
exports.showSassError = showSassError;

var _component_scraper = require('../lib/system/component_scraper');

var componentScraper = _interopRequireWildcard(_component_scraper);

var _sass_util = require('../lib/system/sass_util');

var sassUtil = _interopRequireWildcard(_sass_util);

var _var_util = require('../lib/var_util');

var varUtil = _interopRequireWildcard(_var_util);

var _create_preview = require('../lib/system/create_preview');

var _create_preview2 = _interopRequireDefault(_create_preview);

var _user_config = require('../lib/system/user_config');

var _user_config2 = _interopRequireDefault(_user_config);

var _theme = require('../lib/system/theme');

var _variables = require('./variables');

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

function overwriteSourceVariables(variables) {
	return function (dispatch, getState) {
		dispatch({
			type: 'OVERWRITE_SOURCE_VARIABLES',
			variables: variables
		});

		dispatch(setComponents(varUtil.getComponentsFromVariablesMap(variables)));
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

function setBaseLexiconTheme(value) {
	return function (dispatch, getState) {
		dispatch({
			type: 'SET_BASE_LEXICON_THEME',
			value: value
		});

		userConfig.setConfig('baseLexiconTheme', value);

		var _componentScraper$ini = componentScraper.initVariables(value);

		var sourceVariables = _componentScraper$ini.sourceVariables;
		var variables = _componentScraper$ini.variables;


		dispatch(overwriteSourceVariables(sourceVariables));
		dispatch((0, _variables.overwriteVariables)(variables));

		dispatch(buildLexicon());
	};
};

function setBaseTheme(theme) {
	return {
		theme: theme,
		type: 'SET_BASE_THEME'
	};
};

function setComponents(components) {
	return {
		components: components,
		type: 'SET_COMPONENTS'
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