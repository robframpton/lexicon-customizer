'use strict';

const electron = require('electron');
const GhReleases = require('electron-gh-releases');

const app = electron.app;

const REPO = 'Robert-Frampton/lexicon-customizer';

function updater(win) {
	const options = {
		currentVersion: app.getVersion(),
		repo: REPO
	}

	const updater = new GhReleases(options);

	updater.check((err, status) => {
		if (!err && status) {
			win.send('confirm-download');
		}
	});

	electron.ipcMain.on('download-update', () => {
		updater.download();
	});

	updater.on('update-downloaded', (info) => {
		updater.install();
	});
}

module.exports = updater;
