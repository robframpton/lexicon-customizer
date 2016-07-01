'use strict';

const _ = require('lodash');
const electron = require('electron');
const app = electron.app;

const pkg = require('./package.json');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

const indexURL = `file://${__dirname}/build/html/index.html`
const loadingURL = `file://${__dirname}/build/html/loading.html`

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

let installingStartupDeps = false;

try {
	_.forEach(pkg.startupDependencies, function(version, name) {
		require(name);
	});
}
catch (err) {
	installingStartupDeps = true;

	const npm = require('npm');

	const args = _.map(pkg.startupDependencies, function(version, name) {
		return `${name}@${version}`;
	});

	npm.load({
		loaded: false
	}, function(err) {
		npm.commands.install(args, function(err, data) {
			mainWindow.loadURL(indexURL);
		});
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
		mainWindow = createMainWindow(installingStartupDeps ? loadingURL : indexURL);
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow(installingStartupDeps ? loadingURL : indexURL);
});
