'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.buildLexicon = buildLexicon;
exports.createVariablesFile = createVariablesFile;
exports.renderPreview = renderPreview;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _electron = require('electron');

var _sass_util = require('../lib/system/sass_util');

var sassUtil = _interopRequireWildcard(_sass_util);

var _create_preview = require('../lib/system/create_preview');

var _create_preview2 = _interopRequireDefault(_create_preview);

var _preview = require('./preview');

var _sassError = require('./sassError');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APP_PATH = _electron.remote.app.getAppPath();

function buildLexicon() {
	return function (dispatch, getState) {
		var state = getState();

		var baseLexiconTheme = _lodash2.default.kebabCase(state.get('baseLexiconTheme'));
		var lexiconDirs = state.get('lexiconDirs');

		sassUtil.renderLexiconBase(baseLexiconTheme, lexiconDirs, function (err, filePath) {
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

		var _state$get = state.get('lexiconDirs');

		var customDir = _state$get.customDir;


		sassUtil.writeCustomVariablesFile(state.get('variables'), state.get('sourceVariables'), customDir, state.get('theme')).then(function () {
			dispatch(buildLexicon());
		});
	};
};

function renderPreview(component) {
	return function (dispatch, getState) {
		var state = getState();

		console.log('THIS IS HAPPENING!');

		var baseLexiconTheme = _lodash2.default.kebabCase(state.get('baseLexiconTheme'));

		var _state$get2 = state.get('lexiconDirs');

		var customDir = _state$get2.customDir;


		var cssPath = _path2.default.join(customDir, baseLexiconTheme + '.css?t=' + Date.now());

		var htmlPath = (0, _create_preview2.default)(_lodash2.default.snakeCase(component), cssPath);

		dispatch((0, _preview.setPreviewPaths)(cssPath, htmlPath));
	};
};