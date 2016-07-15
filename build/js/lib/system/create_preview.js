'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createPreview;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _electron = require('electron');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CWD = _electron.remote.app.getAppPath();

var PATH_LEXICON_MARKUP = _path2.default.join(CWD, 'build/html/components');

function createPreview(component, baseLexiconTheme) {
	baseLexiconTheme = _lodash2.default.kebabCase(baseLexiconTheme);
	component = _lodash2.default.snakeCase(component);

	var htmlPath = _path2.default.join(PATH_LEXICON_MARKUP, component + '.html');

	// TODO: we need to write all css files outside of the electron archive, use os module to create dir for all file writing
	var cssPath = _path2.default.join(CWD, 'lexicon/build/' + baseLexiconTheme + '.css') + '?t=' + Date.now();

	return {
		cssPath: cssPath,
		htmlPath: htmlPath
	};
};