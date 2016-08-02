'use strict';

const _ = require('lodash');
const electron = require('electron');
const lexicon = require('lexicon-ux');
const path = require('path');

require('electron-debug')();

const app = electron.app;

const USER_DATA_PATH = app.getPath('userData');

const lexiconPkg = require(path.join(lexicon.srcDir, '..', 'package.json'));
const lexiconUtil = require('./lexicon_util');

const lexiconVersion = lexiconPkg.version;

const indexURL = `file://${__dirname}/build/html/index.html`;

let appReady = false;
let mainWindow;

const lexiconConfig = {};

lexiconUtil.downloadSassDependencies(lexiconVersion, path.join(USER_DATA_PATH, app.getVersion()), function(err, result) {
	if (err) {
		throw err;
	}

	lexiconConfig.dirs = result.lexicon;

	lexiconConfig.dirs.bourbonIncludePaths = result.bourbon.includePaths;

	lexiconConfig.sass = result.sass;

	createMainWindow(indexURL);
});

function createMainWindow(url) {
	if (!mainWindow && appReady && !_.isEmpty(lexiconConfig)) {
		const win = new electron.BrowserWindow({
			height: 800,
			titleBarStyle: 'hidden',
			width: 1400
		});

		win.loadURL(url);

		win.lexicon = lexiconConfig;

		win.on('closed', onClosed);

		mainWindow = win;
	}
}

function onClosed() {
	mainWindow = null;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	createMainWindow(indexURL);
});

app.on('ready', () => {
	appReady = true;

	createMainWindow(indexURL);
});
