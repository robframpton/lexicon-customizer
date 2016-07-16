'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setBaseLexiconTheme = setBaseLexiconTheme;

var _component_scraper = require('../lib/system/component_scraper');

var componentScraper = _interopRequireWildcard(_component_scraper);

var _user_config = require('../lib/system/user_config');

var _user_config2 = _interopRequireDefault(_user_config);

var _index = require('./index');

var _sourceVariables = require('./sourceVariables');

var _variables = require('./variables');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var userConfig = new _user_config2.default();

function setBaseLexiconTheme(value) {
	return function (dispatch, getState) {
		var lexiconDirs = getState().get('lexiconDirs');

		dispatch({
			type: 'SET_BASE_LEXICON_THEME',
			value: value
		});

		userConfig.setConfig('baseLexiconTheme', value);

		var _componentScraper$ini = componentScraper.initVariables(value, lexiconDirs);

		var sourceVariables = _componentScraper$ini.sourceVariables;
		var variables = _componentScraper$ini.variables;


		dispatch((0, _sourceVariables.overwriteSourceVariables)(sourceVariables));
		dispatch((0, _variables.overwriteVariables)(variables));

		dispatch((0, _index.buildLexicon)());
	};
};