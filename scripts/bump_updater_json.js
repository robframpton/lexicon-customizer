'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');

module.exports = () => {
	const filePath = path.join(__dirname, '../auto_updater.json');

	let autoUpdaterJSON = require(filePath);

	const version = require('../app/package.json').version;

	autoUpdaterJSON = _.assign(autoUpdaterJSON, {
		name: `v${version}`,
		pub_date: new Date().toISOString(),
		url: `https://github.com/robert-frampton/lexicon-customizer/releases/download/v${version}/lexicon-customizer-${version}-mac.zip`
	});

	fs.writeFileSync(filePath, JSON.stringify(autoUpdaterJSON, null, '\t'));
};
