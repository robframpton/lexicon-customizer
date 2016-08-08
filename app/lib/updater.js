'use strict';

const app = require('electron').remote.app;
const GhReleases = require('electron-gh-releases');

const REPO = 'Robert-Frampton/lexicon-customizer';

function updater() {
	let options = {
		currentVersion: app.getVersion(),
		repo: REPO
	}

	const updater = new GhReleases(options);

	updater.check((err, status) => {
		if (!err && status) {
			updater.download();
		}
	});

	updater.on('update-downloaded', (info) => {
		updater.install();
	});
}

module.exports = updater;
