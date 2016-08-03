'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isTheme = isTheme;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isTheme(filePath) {
	var pkgPath = _path2.default.join(filePath, 'package.json');

	if (!_fs2.default.existsSync(pkgPath)) {
		return false;
	}

	var pkg = require(pkgPath);

	return !_lodash2.default.isUndefined(pkg.liferayTheme);
};