'use strict';

const async = require('async');
const fs = require('fs-extra');
const path = require('path');
const tarball = require('tarball-extract');

function downloadLexicon(version, dest, cb) {
	const fileName = 'lexicon-ux-' + version + '.tgz';

	const downloadName = path.join(dest, fileName);
	const tarballURL = 'https://registry.npmjs.org/lexicon-ux/-/' + fileName;

	_downloadTarball(tarballURL, downloadName, path.join(dest, 'lexicon', version), function(err, pkg) {
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

	const downloadName = path.join(dest, fileName);
	const tarballURL = 'https://registry.npmjs.org/bourbon/-/' + fileName;

	_downloadTarball(tarballURL, downloadName, path.join(dest, 'bourbon'), cb);
}

function _downloadTarball(url, fileDestination, extractionDestination, cb) {
	const pkgPath = path.join(extractionDestination, 'package');

	try {
		const pkg = require(pkgPath);

		cb(null, pkg);
	}
	catch (err) {
		async.waterfall([
			function(cb) {
				const fileName = path.basename(fileDestination);

				tarball.extractTarball(path.join(__dirname, 'tarballs', fileName), extractionDestination, function(err) {
					let pkg;

					if (!err) {
						pkg = require(pkgPath);
					}

					cb(null, pkg);
				});
			},
			function(pkg, cb) {
				if (pkg) {
					cb(null, pkg);
				}
				else {
					tarball.extractTarballDownload(url, fileDestination, extractionDestination, {}, function(err, result) {
						const pkg = require(pkgPath);

						cb(err, pkg);
					});
				}
			}
		], cb);
	}
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
