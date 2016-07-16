'use strict';

const _ = require('lodash');
const electron = require('electron');
const path = require('path');

const app = electron.app;

const lexiconUtil = require('./lexicon_util');

const lexiconDirs = lexiconUtil.copy(app.getPath('userData'));

require('electron-debug')();

const indexURL = `file://${__dirname}/build/html/index.html`;

let mainWindow;

function onClosed() {
	mainWindow = null;
}

function createMainWindow(url) {
	const win = new electron.BrowserWindow({
		//frame: false,
		height: 800,
		titleBarStyle: 'hidden-inset',
		width: 1400
	});

	win.loadURL(url);

	win.lexicon = {
		dirs: lexiconDirs
	};

	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow(indexURL);
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow(indexURL);
});
