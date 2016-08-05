const argv = require('minimist')(process.argv.slice(2));
const sass = require('node-sass');

const config = JSON.parse(argv.config);

sass.render(config, (err, result) => {
	let exitCode = 0;

	if (err) {
		process.stderr.write(err.toString());

		exitCode = 1;
	}
	else {
		process.stdout.write(result.css.toString());
	}

	process.exit(exitCode);
});
