'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _component_scraper = require('./component_scraper');

var componentScraper = _interopRequireWildcard(_component_scraper);

var _var_util = require('../var_util');

var varUtil = _interopRequireWildcard(_var_util);

var _user_config = require('./user_config');

var _user_config2 = _interopRequireDefault(_user_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
	var userConfig = new _user_config2.default();

	var persistedConfig = userConfig.getConfig();

	var lexiconVariables = void 0;

	if (persistedConfig.baseLexiconTheme === 'atlasTheme') {
		lexiconVariables = componentScraper.mapAtlasVariables();
	} else {
		lexiconVariables = componentScraper.mapLexiconVariables();
	}

	var bootstrapVariables = componentScraper.mapBootstrapVariables();

	var customVariables = componentScraper.mapCustomVariables();

	var variables = bootstrapVariables.merge(lexiconVariables);

	var sourceVariable = variables;

	customVariables.forEach(function (variable, key) {
		var sourceVariable = variables.get(key);

		variables = variables.set(key, sourceVariable.set('value', variable.get('value')));
	});

	var components = varUtil.getComponentsFromVariablesMap(variables);

	var filePaths = _immutable2.default.Map({
		customVariables: _path2.default.join(process.cwd(), 'lexicon', '_custom_variables.scss')
	});

	var initialState = {
		baseLexiconTheme: persistedConfig.baseLexiconTheme || 'lexiconBase',
		components: components,
		filePaths: filePaths,
		previewLoading: true,
		sourceVariables: sourceVariable,
		theme: persistedConfig.theme,
		variables: variables
	};

	return initialState;
};