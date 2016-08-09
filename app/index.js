'use strict';

if (require('electron-squirrel-startup')) {
	return;
}

const _ = require('lodash');
const electron = require('electron');
const fs = require('fs-extra');
const lexicon = require('lexicon-ux');
const path = require('path');

require('electron-debug')();

const app = electron.app;

const USER_DATA_PATH = app.getPath('userData');

const lexiconPkg = require(path.join(lexicon.srcDir, '..', 'package.json'));
const install = require('./lib/install');
const updater = require('./lib/updater');

const lexiconVersion = lexiconPkg.version;

const indexURL = `file://${__dirname}/build/html/index.html`;

let appReady = false;
let lexiconData = {};
let mainWindow;

install.installSassDependencies(lexiconVersion, path.join(USER_DATA_PATH, app.getVersion()), function(err, result) {
	if (err) {
		throw err;
	}

	fs.ensureFileSync(path.join(USER_DATA_PATH, '_custom_variables.scss'));

	let lexiconDirs = result.lexicon;

	lexiconDirs.bourbonIncludePaths = result.bourbon.includePaths;
	lexiconDirs.userDataPath = USER_DATA_PATH;

	lexiconData.dirs = lexiconDirs;
	lexiconData.sassBridgePath = result.sassBridge;

	createMainWindow(indexURL);
});

function onClosed() {
	mainWindow = null;
}

function createMainWindow(url) {
	if (!mainWindow && appReady && !_.isEmpty(lexiconData)) {
		const win = new electron.BrowserWindow({
			height: 800,
			titleBarStyle: 'hidden',
			width: 1400
		});

		win.loadURL(url);

		win.lexicon = lexiconData;

		win.on('closed', onClosed);

		updater(win);

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
