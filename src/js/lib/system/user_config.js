'use strict';

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import {remote} from 'electron';

const USER_DATA_PATH = remote.app.getPath('userData');

class UserConfig {
	constructor() {
		this._userDataPath = USER_DATA_PATH;
		this._userConfigFilePath = path.join(this._userDataPath, 'lexicon_user_config.json');
	}

	getConfig() {
		let config;

		try {
			const fileContent = fs.readFileSync(this._userConfigFilePath);

			config = JSON.parse(fileContent);
		}
		catch (e) {
		}

		if (!config) {
			config = {};

			fs.writeFileSync(this._userConfigFilePath, JSON.stringify(config));
		}

		return config;
	}

	setConfig(key, value) {
		let config = this.getConfig();

		if (_.isObject(key)) {
			_.assign(config, key);
		}
		else if (_.isString(key) && !_.isUndefined(value)) {
			_.set(config, key, value);
		}

		fs.writeFileSync(this._userConfigFilePath, JSON.stringify(config));
	}
}

export default UserConfig;
