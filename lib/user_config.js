'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var remote = require('electron').remote;

var USER_DATA_PATH = remote.app.getPath('userData');

var UserConfig = function() {
	this._userDataPath = USER_DATA_PATH;
	this._userConfigFilePath = path.join(this._userDataPath, 'lexicon_user_config.json');
};

UserConfig.prototype = {
	getConfig: function() {
		var config;

		var filePath = path.join(this._userDataPath, 'lexicon_user_config.json');

		try {
			var fileContent = fs.readFileSync(this._userConfigFilePath);

			config = JSON.parse(fileContent);
		}
		catch (e) {
		}

		if (!config) {
			config = {};

			fs.writeFileSync(this._userConfigFilePath, JSON.stringify(config));
		}

		return config;
	},

	setConfig: function(key, value) {
		var config = this.getConfig();

		_.set(config, key, value);

		fs.writeFileSync(this._userConfigFilePath, JSON.stringify(config));
	}
};

module.exports = UserConfig;