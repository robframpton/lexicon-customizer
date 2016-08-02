'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fsExtra = require('fs-extra');

var fs = _interopRequireWildcard(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _electron = require('electron');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var app = _electron.remote.app;


var APP_PATH = app.getAppPath();

var LEXICON_PATH = _path2.default.join(APP_PATH, 'node_modules/lexicon-ux/build');

var COMPONENTS_PATH = _path2.default.join(APP_PATH, 'build/html/components');

var USER_DATA_PATH = app.getPath('userData');

function createPreview(component, cssPath) {
	var fileName = component + '.html';

	var componentPath = _path2.default.join(COMPONENTS_PATH, fileName);

	var fileContent = fs.readFileSync(componentPath, {
		encoding: 'utf8'
	});

	var data = {
		appPath: APP_PATH,
		iconSpritePath: _path2.default.join(LEXICON_PATH, 'images/icons/icons.svg'),
		imagesPath: _path2.default.join(APP_PATH, 'build/images'),
		lexiconCssPath: cssPath,
		lexiconPath: LEXICON_PATH
	};

	fileContent = fileContent.replace(/\${([a-zA-Z]+)}/g, function (match, g1) {
		return data[g1] || match;
	});

	var filePath = _path2.default.join(USER_DATA_PATH, app.getVersion(), 'preview_markup', fileName);

	fs.outputFileSync(filePath, fileContent);

	return filePath;
}

exports.default = createPreview;