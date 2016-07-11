'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createPreview;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PATH_LEXICON = _path2.default.join(process.cwd(), 'lexicon');

var PATH_LEXICON_IMAGES = _path2.default.join(PATH_LEXICON, 'build/images');

function createPreview(group, component, baseLexiconTheme, cb) {
	baseLexiconTheme = _lodash2.default.kebabCase(baseLexiconTheme);
	component = _lodash2.default.snakeCase(component);

	var cssPath = _path2.default.join(process.cwd(), 'lexicon/build/' + baseLexiconTheme + '.css') + '?t=' + Date.now();
	var previewFilePath = _path2.default.join(process.cwd(), 'lexicon/build/' + group + '-preview.html');

	_ejs2.default.renderFile(_path2.default.join(__dirname, '..', 'templates', 'preview.ejs'), {
		componentPreviewPath: _path2.default.join(process.cwd(), 'lexicon/markup/lexicon', component + '.ejs'),
		iconSpritePath: _path2.default.join(PATH_LEXICON_IMAGES, 'icons', 'icons.svg'),
		imagesPath: PATH_LEXICON_IMAGES,
		lexiconCSSPath: cssPath,
		scripts: [_path2.default.join(process.cwd(), 'bower_components/jquery/dist/jquery.js'), _path2.default.join(PATH_LEXICON, 'build/js/bootstrap.js'), _path2.default.join(PATH_LEXICON, 'build/js/svg4everybody.js')]
	}, function (err, result) {
		if (err) {
			throw err;
		}

		_fs2.default.writeFileSync(previewFilePath, result);

		var htmlPath = previewFilePath + '?component=' + component;

		cb({
			cssPath: cssPath,
			htmlPath: htmlPath
		});
	});
};