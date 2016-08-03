'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createPreviewPopout = createPreviewPopout;
exports.destroyPreviewPopout = destroyPreviewPopout;
exports.setPreviewPopout = setPreviewPopout;
exports.togglePreviewPopout = togglePreviewPopout;

var _electron = require('electron');

var app = _electron.remote.app;
var BrowserWindow = _electron.remote.BrowserWindow;


var previewPopoutURL = 'file://' + app.getAppPath() + '/build/html/preview_popout.html';

function createPreviewPopout() {
	return function (dispatch, getState) {
		var previewPopout = getState().get('previewPopout');

		if (!previewPopout) {
			previewPopout = new BrowserWindow({
				height: 600,
				parent: BrowserWindow.getFocusedWindow(),
				width: 800
			});

			previewPopout.loadURL(previewPopoutURL);

			previewPopout.on('closed', function () {
				dispatch(setPreviewPopout(null));
			});
		}

		dispatch(setPreviewPopout(previewPopout));
	};
};

function destroyPreviewPopout() {
	return function (dispatch, getState) {
		var previewPopout = getState().get('previewPopout');

		if (previewPopout) {
			previewPopout.destroy();
		}

		dispatch(setPreviewPopout(null));
	};
};

function setPreviewPopout(previewPopout) {
	return {
		previewPopout: previewPopout,
		type: 'SET_PREVIEW_POPOUT'
	};
};

function togglePreviewPopout() {
	return function (dispatch, getState) {
		var previewPopout = getState().get('previewPopout');

		if (previewPopout) {
			dispatch(destroyPreviewPopout());
		} else {
			dispatch(createPreviewPopout());
		}
	};
};