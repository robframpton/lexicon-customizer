'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _baseLexiconTheme = require('./baseLexiconTheme');

var _baseLexiconTheme2 = _interopRequireDefault(_baseLexiconTheme);

var _bootstrapComponents = require('./bootstrapComponents');

var _bootstrapComponents2 = _interopRequireDefault(_bootstrapComponents);

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

var _filePaths = require('./filePaths');

var _filePaths2 = _interopRequireDefault(_filePaths);

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

var _preview = require('./preview');

var _preview2 = _interopRequireDefault(_preview);

var _previewLoading = require('./previewLoading');

var _previewLoading2 = _interopRequireDefault(_previewLoading);

var _sassError = require('./sassError');

var _sassError2 = _interopRequireDefault(_sassError);

var _selectedComponent = require('./selectedComponent');

var _selectedComponent2 = _interopRequireDefault(_selectedComponent);

var _sourceVariables = require('./sourceVariables');

var _sourceVariables2 = _interopRequireDefault(_sourceVariables);

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

var _reduxImmutable = require('redux-immutable');

var _variables = require('./variables');

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lexiconCustomizerReducer = (0, _reduxImmutable.combineReducers)({
	baseLexiconTheme: _baseLexiconTheme2.default,
	bootstrapComponents: _bootstrapComponents2.default,
	components: _components2.default,
	filePaths: _filePaths2.default,
	group: _group2.default,
	preview: _preview2.default,
	previewLoading: _previewLoading2.default,
	sassError: _sassError2.default,
	selectedComponent: _selectedComponent2.default,
	sourceVariables: _sourceVariables2.default,
	theme: _theme2.default,
	variables: _variables2.default
});

exports.default = lexiconCustomizerReducer;