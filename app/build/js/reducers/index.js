'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reduxImmutable = require('redux-immutable');

var _baseLexiconTheme = require('./baseLexiconTheme');

var _baseLexiconTheme2 = _interopRequireDefault(_baseLexiconTheme);

var _bootstrapComponents = require('./bootstrapComponents');

var _bootstrapComponents2 = _interopRequireDefault(_bootstrapComponents);

var _colorVariableName = require('./colorVariableName');

var _colorVariableName2 = _interopRequireDefault(_colorVariableName);

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

var _lexiconDirs = require('./lexiconDirs');

var _lexiconDirs2 = _interopRequireDefault(_lexiconDirs);

var _lexiconVersion = require('./lexiconVersion');

var _lexiconVersion2 = _interopRequireDefault(_lexiconVersion);

var _lockedVariables = require('./lockedVariables');

var _lockedVariables2 = _interopRequireDefault(_lockedVariables);

var _preview = require('./preview');

var _preview2 = _interopRequireDefault(_preview);

var _previewPopout = require('./previewPopout');

var _previewPopout2 = _interopRequireDefault(_previewPopout);

var _sassError = require('./sassError');

var _sassError2 = _interopRequireDefault(_sassError);

var _selectedComponent = require('./selectedComponent');

var _selectedComponent2 = _interopRequireDefault(_selectedComponent);

var _sourceVariables = require('./sourceVariables');

var _sourceVariables2 = _interopRequireDefault(_sourceVariables);

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

var _variables = require('./variables');

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lexiconCustomizerReducer = (0, _reduxImmutable.combineReducers)({
	baseLexiconTheme: _baseLexiconTheme2.default,
	bootstrapComponents: _bootstrapComponents2.default,
	colorVariableName: _colorVariableName2.default,
	components: _components2.default,
	group: _group2.default,
	lexiconDirs: _lexiconDirs2.default,
	lexiconVersion: _lexiconVersion2.default,
	lockedVariables: _lockedVariables2.default,
	preview: _preview2.default,
	previewPopout: _previewPopout2.default,
	sassError: _sassError2.default,
	selectedComponent: _selectedComponent2.default,
	sourceVariables: _sourceVariables2.default,
	theme: _theme2.default,
	variables: _variables2.default
});

exports.default = lexiconCustomizerReducer;