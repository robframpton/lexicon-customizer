'use strict';

import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export function isTheme(filePath) {
	const pkgPath = path.join(filePath, 'package.json');

	if (!fs.existsSync(pkgPath)) {
		return false;
	}

	const pkg = require(pkgPath);

	return !_.isUndefined(pkg.liferayTheme);
};
