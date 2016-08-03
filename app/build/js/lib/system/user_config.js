'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _electron = require('electron');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var USER_DATA_PATH = _electron.remote.app.getPath('userData');

var UserConfig = function () {
	function UserConfig() {
		_classCallCheck(this, UserConfig);

		this._userDataPath = USER_DATA_PATH;
		this._userConfigFilePath = _path2.default.join(this._userDataPath, 'lexicon_user_config.json');
	}

	_createClass(UserConfig, [{
		key: 'getConfig',
		value: function getConfig() {
			var config = void 0;

			try {
				var fileContent = _fs2.default.readFileSync(this._userConfigFilePath);

				config = JSON.parse(fileContent);
			} catch (e) {}

			if (!config) {
				config = {};

				_fs2.default.writeFileSync(this._userConfigFilePath, JSON.stringify(config));
			}

			return config;
		}
	}, {
		key: 'setConfig',
		value: function setConfig(key, value) {
			var config = this.getConfig();

			if (_lodash2.default.isObject(key)) {
				_lodash2.default.assign(config, key);
			} else if (_lodash2.default.isString(key) && !_lodash2.default.isUndefined(value)) {
				_lodash2.default.set(config, key, value);
			}

			_fs2.default.writeFileSync(this._userConfigFilePath, JSON.stringify(config));
		}
	}]);

	return UserConfig;
}();

exports.default = UserConfig;