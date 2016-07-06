'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.buildLexicon = buildLexicon;
exports.createVariablesFile = createVariablesFile;
exports.renderPreview = renderPreview;
exports.setBaseLexiconTheme = setBaseLexiconTheme;

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

var _sourceVariables = require('./sourceVariables');

var _variables = require('./variables');

var _sassError = require('./sassError');

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
				dispatch((0, _sassError.showSassError)(err));
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


		dispatch((0, _sourceVariables.overwriteSourceVariables)(sourceVariables));
		dispatch((0, _variables.overwriteVariables)(variables));

		dispatch(buildLexicon());
	};
};