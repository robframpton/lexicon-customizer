'use strict';

const async = require('async');
const fs = require('fs-extra');
const npm = require('npm');
const path = require('path');
const tarball = require('tarball-extract');

const REGISTRY_URL = 'https://registry.npmjs.org';

function downloadLexicon(version, dest, cb) {
	const fileName = 'lexicon-ux-' + version + '.tgz';

	const fileDestination = path.join(dest, fileName);
	const tarballURL = _getTarballURL('lexicon-ux', fileName);

	_installDependency(tarballURL, fileDestination, path.join(dest, 'lexicon', version), function(err, pkg) {
		const lexiconPath = resolveLexiconPath(version, dest);

		_fixLexiconBaseMain(pkg.srcDir);

		const customDir = path.join(lexiconPath, 'custom');

		try {
			fs.copySync(path.join(__dirname, 'lexicon/custom'), customDir, {
				clobber: false
			});
		}
		catch (err) {
		}

		pkg.customDir = customDir;

		cb(err, pkg);
	});
}

exports.downloadLexicon = downloadLexicon;

function downloadSassDependencies(version, dest, cb) {
	async.parallel({
		bourbon: function(cb) {
			_downloadBourbon(dest, cb);
		},
		lexicon: function(cb) {
			downloadLexicon(version, dest, cb);
		},
		sass: function(cb) {
			_installNodeSass(dest, cb);
		}
	}, cb);
}

exports.downloadSassDependencies = downloadSassDependencies;

function resolveLexiconPath(version, dest) {
	return path.join(dest, 'lexicon', version, 'package');
}

exports.resolveLexiconPath = resolveLexiconPath;

function _downloadBourbon(dest, cb) {
	const fileName = 'bourbon-4.2.7.tgz';

	const fileDestination = path.join(dest, fileName);
	const tarballURL = _getTarballURL('bourbon', fileName);

	_installDependency(tarballURL, fileDestination, path.join(dest, 'bourbon'), cb);
}

function _downloadAndExtractTarball(url, fileDestination, extractionDestination, cb) {
	const pkgPath = path.join(extractionDestination, 'package');

	tarball.extractTarballDownload(url, fileDestination, extractionDestination, {}, function(err, result) {
		const pkg = require(pkgPath);

		cb(err, pkg);
	});
}

function _extractCachedTarball(fileDestination, extractionDestination, cb) {
	const fileName = path.basename(fileDestination);
	const pkgPath = path.join(extractionDestination, 'package');

	tarball.extractTarball(path.join(__dirname, 'tarballs', fileName), extractionDestination, function(err) {
		let pkg;

		if (!err) {
			pkg = require(pkgPath);
		}

		cb(null, pkg);
	});
}

function _fixLexiconBaseMain(srcDir) {
	const filePath = path.join(srcDir, 'scss/lexicon-base/main.scss');

	let fileContent = fs.readFileSync(filePath, {
		encoding: 'utf8'
	});

	if (/variables/.test(fileContent)) {
		return;
	}

	fileContent = fileContent.replace('@import "mixins";', '@import "variables";\n@import "mixins";');

	fs.writeFileSync(filePath, fileContent);
}

function _getTarballURL(packageName, fileName) {
	return REGISTRY_URL + '/' + packageName + '/-/' + fileName;
}

function _installDependency(url, fileDestination, extractionDestination, cb) {
	const pkgPath = path.join(extractionDestination, 'package');

	let pkg;

	try {
		pkg = require(pkgPath);
	}
	catch (err) {
	}

	if (pkg) {
		cb(null, pkg);

		return;
	}

	async.waterfall([
		function(cb) {
			_extractCachedTarball(fileDestination, extractionDestination, cb);
		},
		function(pkg, cb) {
			if (pkg) {
				cb(null, pkg);

				return;
			}

			_downloadAndExtractTarball(url, fileDestination, extractionDestination, cb);
		}
	], cb);
}

function _installNodeSass(dest, cb) {
	const pkgPath = path.join(dest, 'node_modules', 'lexicon-node-sass');

	let sass;

	try {
		sass = require(pkgPath);
	}
	catch (err) {
	}

	if (sass) {
		cb(null, sass);

		return;
	}

	npm.load({
		loaded: false
	}, function (err) {
		npm.commands.install(dest, [path.join(__dirname, 'lexicon-node-sass')], function(err, data) {
			sass = require(pkgPath);

			cb(null, pkgPath);
		});

		npm.on('log', function (message) {
			console.log(message);
		});
	});
}
