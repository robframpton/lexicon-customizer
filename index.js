'use strict';

const _ = require('lodash');
const electron = require('electron');
const lexicon = require('lexicon-ux');
const path = require('path');

require('electron-debug')();

const app = electron.app;

const USER_DATA_PATH = app.getPath('userData');

const lexiconPkg = require(path.join(lexicon.srcDir, '..', 'package.json'));
const install = require('./scripts/install');

const lexiconVersion = lexiconPkg.version;

const indexURL = `file://${__dirname}/build/html/index.html`;

let appReady = false;
let lexiconDirs;
let mainWindow;

install.installSassDependencies(lexiconVersion, path.join(USER_DATA_PATH, app.getVersion()), function(err, result) {
	if (err) {
		throw err;
	}

	lexiconDirs = result.lexicon;

	lexiconDirs.bourbonIncludePaths = result.bourbon.includePaths;

	createMainWindow(indexURL);
});

function onClosed() {
	mainWindow = null;
}

function createMainWindow(url) {
	if (!mainWindow && appReady && lexiconDirs) {
		const win = new electron.BrowserWindow({
			height: 800,
			titleBarStyle: 'hidden',
			width: 1400
		});

		win.loadURL(url);

		win.lexicon = {
			dirs: lexiconDirs
		};

		win.on('closed', onClosed);

		mainWindow = win;
	}
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
