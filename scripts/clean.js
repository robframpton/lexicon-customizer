'use strict';

const app = require('electron').app;
const del = require('del');
const path = require('path');

const STR_LEXICON_CUSTOMIZER = 'Lexicon Customizer';

const PATH_USER_DATA = path.join(app.getPath('userData'), '..', STR_LEXICON_CUSTOMIZER);

const VERSION = require(path.join(__dirname, '../app/package.json')).version;

del([path.join(PATH_USER_DATA, VERSION)], {
	force: true
}).then((paths) => {
	app.exit(0);
});
