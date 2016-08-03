'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initVariables = initVariables;
exports.mapAtlasVariables = mapAtlasVariables;
exports.mapBootstrapVariables = mapBootstrapVariables;
exports.mapCustomVariables = mapCustomVariables;
exports.mapThemeVariables = mapThemeVariables;
exports.mapLexiconVariables = mapLexiconVariables;
exports.mapVariablesFromFile = mapVariablesFromFile;
exports._getAtlasThemeComponents = _getAtlasThemeComponents;
exports._getComponentArrayFromVariablesFile = _getComponentArrayFromVariablesFile;
exports._getLexiconBaseComponents = _getLexiconBaseComponents;
exports._getReducedComponentName = _getReducedComponentName;
exports._mapBootstrapVariablesFile = _mapBootstrapVariablesFile;
exports._mapVariablesFromComponentArray = _mapVariablesFromComponentArray;
exports._mapVariablesFromString = _mapVariablesFromString;
exports._mergeVariables = _mergeVariables;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COMPONENT_REDUCER_MAP = {
	tooltip: 'tooltips',
	type: 'typography'
};

var REGEX_BOOTSTRAP_COMPONENT_NAME = /([\w\s]+)\n/;

function initVariables(baseTheme, lexiconDirs) {
	var customDir = lexiconDirs.customDir;
	var srcDir = lexiconDirs.srcDir;


	var bootstrapVariables = mapBootstrapVariables(srcDir);

	var lexiconVariables = mapLexiconVariables(srcDir);

	var variables = _mergeVariables(bootstrapVariables, lexiconVariables);

	if (baseTheme === 'atlasTheme') {
		var atlasVariables = mapAtlasVariables(srcDir);

		variables = _mergeVariables(variables, atlasVariables);
	}

	var sourceVariables = variables;

	mapCustomVariables(customDir).forEach(function (variable, key) {
		if (sourceVariables.has(key)) {
			var sourceVariable = variables.get(key);

			variables = variables.set(key, sourceVariable.set('value', variable.get('value')));
		}
	});

	return {
		sourceVariables: sourceVariables,
		variables: variables
	};
};

function mapAtlasVariables(srcDir) {
	return _mapVariablesFromComponentArray(_getAtlasThemeComponents(srcDir), _path2.default.join(srcDir, 'scss/atlas-theme/variables'), 'lexicon');
};

function mapBootstrapVariables(srcDir) {
	return _mapBootstrapVariablesFile(srcDir);
};

function mapCustomVariables(customDir) {
	return mapVariablesFromFile(_path2.default.join(customDir, '_custom_variables.scss'), 'custom', '');
};

function mapThemeVariables(themePath) {
	return mapVariablesFromFile(_path2.default.join(themePath, 'src/css/_aui_variables.scss'), 'theme', '');
};

function mapLexiconVariables(srcDir) {
	return _mapVariablesFromComponentArray(_getLexiconBaseComponents(srcDir), _path2.default.join(srcDir, 'scss/lexicon-base/variables'), 'lexicon');
};

function mapVariablesFromFile(filePath, group, component) {
	if (!filePath || !_fs2.default.existsSync(filePath)) {
		return (0, _immutable.OrderedMap)();
	}

	var fileContents = _fs2.default.readFileSync(filePath, {
		encoding: 'utf8'
	});

	return _mapVariablesFromString(fileContents, group, component);
};

function _getAtlasThemeComponents(srcDir) {
	return _getComponentArrayFromVariablesFile(_path2.default.join(srcDir, 'scss/atlas-theme/_variables.scss'));
};

function _getComponentArrayFromVariablesFile(filePath) {
	var fileContents = _fs2.default.readFileSync(filePath, {
		encoding: 'utf8'
	});

	var regex = /\@import\s\"variables\/(.*)\"/;

	return _lodash2.default.reduce(fileContents.split('\n'), function (result, item, index) {
		var match = item.match(regex);

		if (match) {
			result.push(match[1]);
		}

		return result;
	}, []);
};

function _getLexiconBaseComponents(srcDir) {
	return _getComponentArrayFromVariablesFile(_path2.default.join(srcDir, 'scss/lexicon-base/_variables.scss'));
};

function _getReducedComponentName(component) {
	return COMPONENT_REDUCER_MAP[component] || component;
};

function _mapBootstrapVariablesFile(srcDir) {
	var fileContents = _fs2.default.readFileSync(_path2.default.join(srcDir, 'scss/bootstrap/_variables.scss'), {
		encoding: 'utf8'
	});

	var fileSections = fileContents.split('//== ');

	var orderedMap = (0, _immutable.OrderedMap)();

	_lodash2.default.forEach(fileSections, function (item, index) {
		if (index == 0) {
			return;
		}

		var name = item.match(REGEX_BOOTSTRAP_COMPONENT_NAME);

		if (name && name.length) {
			var componentName = _lodash2.default.kebabCase(name[1]);

			orderedMap = orderedMap.merge(_mapVariablesFromString(item, 'bootstrap', componentName));
		}
	});

	return orderedMap;
};

function _mapVariablesFromComponentArray(componentArray, variablesDir, group) {
	var orderedMap = (0, _immutable.OrderedMap)();

	_lodash2.default.forEach(componentArray, function (item, index) {
		var fileName = '_' + item + '.scss';

		var componentVariables = mapVariablesFromFile(_path2.default.join(variablesDir, fileName), group, item);

		orderedMap = orderedMap.merge(componentVariables);
	});

	return orderedMap;
};

function _mapVariablesFromString(fileContents, group, component) {
	var orderedMap = (0, _immutable.OrderedMap)();

	fileContents.replace(/(\$.*):[\s]*(.*);/g, function (match, variable, value) {
		value = _lodash2.default.trim(value.replace('!default', ''));

		orderedMap = orderedMap.set(variable, (0, _immutable.Map)({
			component: _getReducedComponentName(component),
			group: group,
			name: variable,
			value: value
		}));
	});

	return orderedMap;
};

function _mergeVariables(variables, targetVariables) {
	targetVariables.forEach(function (tragetVariable, key) {
		if (variables.has(key)) {
			var modifiedVariable = variables.get(key).set('value', tragetVariable.get('value'));

			variables = variables.set(key, modifiedVariable);
		} else {
			variables = variables.set(key, tragetVariable);
		}
	});

	return variables;
};