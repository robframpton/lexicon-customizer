'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _electron = require('electron');

var _component_scraper = require('./component_scraper');

var componentScraper = _interopRequireWildcard(_component_scraper);

var _var_util = require('../var_util');

var varUtil = _interopRequireWildcard(_var_util);

var _user_config = require('./user_config');

var _user_config2 = _interopRequireDefault(_user_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COMPONENT_BLACKLIST = ['iconography'];

var APP_PATH = _electron.remote.app.getAppPath();

var WIN = _electron.remote.getCurrentWindow();

module.exports = function () {
	var userConfig = new _user_config2.default();

	var persistedConfig = userConfig.getConfig();

	var lexiconDirs = WIN.lexicon.dirs;

	var _componentScraper$ini = componentScraper.initVariables(persistedConfig.baseLexiconTheme, lexiconDirs);

	var sourceVariables = _componentScraper$ini.sourceVariables;
	var variables = _componentScraper$ini.variables;


	var components = varUtil.getComponentsFromVariablesMap(variables).filter(function (component) {
		return !COMPONENT_BLACKLIST.includes(component);
	});

	var initialState = {
		baseLexiconTheme: persistedConfig.baseLexiconTheme || 'lexiconBase',
		components: components,
		lexiconDirs: lexiconDirs,
		selectedComponent: persistedConfig.selectedComponent,
		sourceVariables: sourceVariables,
		theme: persistedConfig.theme,
		variables: variables
	};

	return initialState;
};