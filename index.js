'use strict';

const _ = require('lodash');
const path = require('path');
const electron = require('electron');
const spawn = require('cross-spawn').spawn;

const app = electron.app;

require('crash-reporter').start();

require('electron-debug')();

const indexURL = `file://${__dirname}/build/html/index.html`
const loadingURL = `file://${__dirname}/build/html/loading.html`

let mainWindow;

function onClosed() {
	mainWindow = null;
}

let building = false;

try {
	// Will throw error if libSass bindings are missing or incorrect
	require('node-sass');
}
catch (err) {
	building = true;

	var child = spawn('npm', ['rebuild', 'node-sass'], {
		stdio: 'inherit'
	});

	child.on('close', function(code) {
		mainWindow.loadURL(indexURL);
	});
}

function createMainWindow(url) {
	const win = new electron.BrowserWindow({
		//frame: false,
		height: 800,
		titleBarStyle: 'hidden-inset',
		width: 1400
	});

	win.loadURL(url);
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
		mainWindow = createMainWindow(building ? loadingURL : indexURL);
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow(building ? loadingURL : indexURL);
});
