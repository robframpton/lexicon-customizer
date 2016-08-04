const spawn = require('cross-spawn').spawn;
const path = require('path');

module.exports = (config, cb) => {
	config = JSON.stringify(config);

	const child = spawn(path.join(__dirname, 'node.exe'), ['sass.js', '--config', config]);

	let err;
	let result;

	child.stdout.on('data', (data) => {
		result = data;
	});

	child.stderr.on('data', (data) => {
		err = data;
	});

	child.on('close', (code) => {
		cb(err, data);
	});
};
