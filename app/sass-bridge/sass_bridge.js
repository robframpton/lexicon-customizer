const path = require('path');
const remote = require('electron').remote;
const spawn = require('cross-spawn').spawn;

const WIN = remote.getCurrentWindow();

module.exports.render = (config, cb) => {
	config = JSON.stringify(config);

	const {sassBridge} = WIN.lexicon;

	const {nodePath, sassPath} = sassBridge;

	const child = spawn(
		nodePath,
		[
			sassPath,
			'--config',
			config
		]
	);

	let err;
	let result;

	child.stdout.on('data', (data) => {
		result = data;
	});

	child.stderr.on('data', (data) => {
		err = data;
	});

	child.on('close', (code) => {
		cb(err, {
			css: result
		});
	});
};
