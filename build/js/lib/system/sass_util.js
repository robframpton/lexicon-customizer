'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sass = exports._writeThemeFileTask = exports.renderLexiconBase = undefined;
exports.clearCustomVariablesFile = clearCustomVariablesFile;
exports.clearModifiedVariablesFromTheme = clearModifiedVariablesFromTheme;
exports.renderLexiconBaseTask = renderLexiconBaseTask;
exports.writeCustomVariablesFile = writeCustomVariablesFile;
exports._clearModifiedVariablesFromFile = _clearModifiedVariablesFromFile;
exports._getModifiedVariablesString = _getModifiedVariablesString;
exports._getThemeVariables = _getThemeVariables;
exports._generateVariablesString = _generateVariablesString;
exports._getThemeVariablesFileAbsolutePath = _getThemeVariablesFileAbsolutePath;
exports._writeThemeFile = _writeThemeFile;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nodeSass = require('node-sass');

var _nodeSass2 = _interopRequireDefault(_nodeSass);

var _electron = require('electron');

var _component_scraper = require('./component_scraper');

var componentScraper = _interopRequireWildcard(_component_scraper);

var _var_util = require('../var_util');

var varUtil = _interopRequireWildcard(_var_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CWD = _electron.remote.app.getAppPath();

function clearCustomVariablesFile(variables, customDir, themePath) {
	if (themePath) {
		clearModifiedVariablesFromTheme(variables, themePath);
	}

	return _fsPromise2.default.writeFile(_path2.default.join(customDir, '_custom_variables.scss'), '');
};

function clearModifiedVariablesFromTheme(variables, themePath) {
	_clearModifiedVariablesFromFile(variables, _getThemeVariablesFileAbsolutePath(themePath));
};

var renderLexiconBase = exports.renderLexiconBase = _lodash2.default.debounce(renderLexiconBaseTask, 300);

function renderLexiconBaseTask(baseLexiconTheme, lexiconDirs, cb) {
	var bourbonIncludePaths = lexiconDirs.bourbonIncludePaths;
	var customDir = lexiconDirs.customDir;
	var includePaths = lexiconDirs.includePaths;
	var srcDir = lexiconDirs.srcDir;


	baseLexiconTheme = _lodash2.default.kebabCase(baseLexiconTheme);

	_path2.default.join(customDir, baseLexiconTheme + '.scss');

	_nodeSass2.default.render({
		file: _path2.default.join(customDir, baseLexiconTheme + '.scss'),
		includePaths: includePaths.concat(bourbonIncludePaths)
	}, function (err, result) {
		var filePath = void 0;

		if (!err) {
			var cssString = result.css.toString();

			filePath = _path2.default.join(customDir, baseLexiconTheme + '.css');

			_fs2.default.writeFileSync(filePath, cssString);
		}

		cb(err, filePath);
	});
};

function writeCustomVariablesFile(variables, sourceVariables, dir, themePath) {
	var variablesString = _getModifiedVariablesString(variables, sourceVariables);

	if (themePath) {
		_writeThemeFileTask(variables, variablesString, themePath);
	}

	return _fsPromise2.default.writeFile(_path2.default.join(dir, '_custom_variables.scss'), variablesString);
};

function _clearModifiedVariablesFromFile(variables, filePath) {
	var themeVariables = _getThemeVariables(variables, filePath);

	return _fsPromise2.default.writeFile(filePath, _generateVariablesString(themeVariables));
};

function _getModifiedVariablesString(variables, sourceVariables) {
	var modifiedVariables = varUtil.getModifiedVariables(variables, sourceVariables);

	return _generateVariablesString(modifiedVariables);
};

function _getThemeVariables(variables, filePath) {
	var fileVariables = componentScraper.mapVariablesFromFile(filePath);

	return fileVariables.filter(function (variable, key) {
		return !variables.has(key);
	});
};

function _generateVariablesString(modifiedVariables) {
	return modifiedVariables.toArray().map(function (variable, index) {
		return variable.get('name') + ': ' + variable.get('value') + ';\n';
	}).join('');
};

function _getThemeVariablesFileAbsolutePath(themePath) {
	return _path2.default.join(themePath, 'src/css/_aui_variables.scss');
};

function _writeThemeFile(variables, variablesString, themePath) {
	var themeVariables = _getThemeVariables(variables, _getThemeVariablesFileAbsolutePath(themePath));

	variablesString = variablesString + '\n' + _generateVariablesString(themeVariables);

	_fsPromise2.default.writeFile(_path2.default.join(themePath, 'src/css/_aui_variables.scss'), variablesString);
}

var _writeThemeFileTask = exports._writeThemeFileTask = _lodash2.default.debounce(_writeThemeFile, 100);

exports.sass = _nodeSass2.default;