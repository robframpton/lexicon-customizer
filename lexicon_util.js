'use strict';

const async = require('async');
const fs = require('fs-extra');
const path = require('path');
const tarball = require('tarball-extract');

function downloadLexicon(version, dest, cb) {
	const fileName = 'lexicon-ux-' + version + '.tgz';

	const downloadName = path.join(dest, fileName);
	const tarballURL = 'https://registry.npmjs.org/lexicon-ux/-/' + fileName;

	_downloadTarball(tarballURL, downloadName, path.join(dest, 'lexicon', version), function(err, result) {
		const lexiconPath = resolveLexiconPath(version, dest);

		let pkg = require(lexiconPath);

		_fixLexiconBaseMain(pkg.srcDir);

		const customDir = path.join(lexiconPath, 'custom');

		fs.copySync(path.join(__dirname, 'lexicon/custom'), customDir);

		pkg.customDir = customDir;

		cb(err, pkg);
	});
};

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
};

exports.downloadSassDependencies = downloadSassDependencies;

function resolveLexiconPath(version, dest) {
	return path.join(dest, 'lexicon', version, 'package');
};

exports.resolveLexiconPath = resolveLexiconPath;

function _downloadBourbon(dest, cb) {
	const fileName = 'bourbon-4.2.7.tgz';

	const downloadName = path.join(dest, fileName);
	const tarballURL = 'https://registry.npmjs.org/bourbon/-/' + fileName;

	_downloadTarball(tarballURL, downloadName, path.join(dest, 'bourbon'), function(err, result) {
		const pkg = require(path.join(result.destination, 'package'));

		result.includePaths = pkg.includePaths;

		cb(err, result);
	});
};

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
};

function _downloadTarball(url, fileDestination, extractionDestination, cb) {
	try {
		const pkg = require(path.join(extractionDestination, 'package'));

		cb(null, pkg);
	}
	catch (err) {
		tarball.extractTarballDownload(url, fileDestination, extractionDestination, {}, cb);
	}
}
