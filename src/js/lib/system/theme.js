'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

module.exports = {
	isTheme: function(filePath) {
		var pkgPath = path.join(filePath, 'package.json');

		if (!fs.existsSync(pkgPath)) {
			return false;
		}

		var pkg = require(pkgPath);

		return !_.isUndefined(pkg.liferayTheme);
	}
};
