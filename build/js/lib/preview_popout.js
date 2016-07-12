'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.handlePreviewPopout = handlePreviewPopout;
exports.getPreviewDataFromState = getPreviewDataFromState;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _electron = require('electron');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowserWindow = _electron.remote.BrowserWindow;


var EVENT_PREVIEW_DATA = 'preview-data';

var currentPreviewData = void 0;

function handlePreviewPopout(store) {
	_electron.ipcRenderer.on('request-preview-data', function () {
		var state = store.getState();

		var previewPopout = state.get('previewPopout');

		if (previewPopout) {
			previewPopout.send(EVENT_PREVIEW_DATA, getPreviewDataFromState(state));
		}
	});

	store.subscribe(function () {
		var previousPreviewData = currentPreviewData;

		var state = store.getState();

		var previewPopout = state.get('previewPopout');

		currentPreviewData = getPreviewDataFromState(state);

		if (previewPopout && !_lodash2.default.isEqual(currentPreviewData, previousPreviewData)) {
			previewPopout.send(EVENT_PREVIEW_DATA, currentPreviewData);
		}
	});
};

function getPreviewDataFromState(state) {
	var _state$get = state.get('preview');

	var cssPath = _state$get.cssPath;
	var htmlPath = _state$get.htmlPath;


	return {
		cssPath: cssPath,
		htmlPath: htmlPath
	};
};