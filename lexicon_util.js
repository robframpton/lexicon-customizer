'use strict';

const fs = require('fs-extra');
const lexicon = require('lexicon-ux');
const path = require('path');

const lexiconPkg = require(path.join(lexicon.srcDir, '..', 'package.json'));

const lexiconVersion = lexiconPkg.version;

function copy(dest) {
	const buildDir = path.join(__dirname, 'lexicon', 'build');
	const srcDir = path.join(dest, 'lexicon', lexiconVersion, 'src');

	const customDir = path.join(dest, 'lexicon', lexiconVersion, 'custom');

	fs.copySync(path.join(__dirname, 'lexicon/custom'), customDir);
	fs.copySync(lexicon.buildDir, buildDir);
	fs.copySync(lexicon.srcDir, srcDir);

	fixLexiconBaseMain(srcDir);

	return {
		buildDir: buildDir,
		customDir: customDir,
		srcDir: srcDir
	};
};

function fixLexiconBaseMain(srcDir) {
	const filePath = path.join(srcDir, 'scss/lexicon-base/main.scss');

	let fileContent = fs.readFileSync(filePath, {
		encoding: 'utf8'
	});

	fileContent = fileContent.replace('@import "mixins";', '@import "variables";\n@import "mixins";');

	fs.writeFileSync(filePath, fileContent);
};

module.exports.copy = copy;
