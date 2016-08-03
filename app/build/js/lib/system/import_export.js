'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.exportVariables = exportVariables;
exports.importVariables = importVariables;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _electron = require('electron');

var _variables = require('../../actions/variables');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _electron.remote.app;
var dialog = _electron.remote.dialog;


var DOWNLOADS_PATH = app.getPath('downloads');

function exportVariables(customDir) {
	dialog.showSaveDialog({
		defaultPath: _path2.default.join(DOWNLOADS_PATH, '_variables.scss')
	}, function (filePath) {
		_fsExtra2.default.copySync(_path2.default.join(customDir, '_custom_variables.scss'), filePath);
	});
}

function importVariables(dispatch) {
	dialog.showOpenDialog({
		properties: ['openFile']
	}, function (filePaths) {
		if (filePaths && filePaths.length) {
			dispatch((0, _variables.importVariables)(filePaths[0]));
		}
	});
}