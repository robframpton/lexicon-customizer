'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _he = require('he');

var _he2 = _interopRequireDefault(_he);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreviewBox = function (_Component) {
	_inherits(PreviewBox, _Component);

	function PreviewBox() {
		_classCallCheck(this, PreviewBox);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(PreviewBox).apply(this, arguments));
	}

	_createClass(PreviewBox, [{
		key: 'render',
		value: function render() {
			var componentName = this.props.componentName;

			var htmlContent = '';

			if (componentName) {
				var componentHTMLFileName = componentName + '.html';

				if (!_fs2.default.exists(_path2.default.join(process.cwd(), 'node_modules/lexicon/src/content', componentHTMLFileName))) {
					componentHTMLFileName = componentHTMLFileName.replace('-', '_');
				}

				htmlContent = _fs2.default.readFileSync(_path2.default.join(process.cwd(), 'node_modules/lexicon/src/content', componentHTMLFileName), {
					encoding: 'utf8'
				});

				var imagesPath = _path2.default.join(process.cwd(), 'node_modules/lexicon/src/images');

				htmlContent = htmlContent.replace(/\.\.\/\.\.\/images/g, imagesPath);
				htmlContent = htmlContent.replace(/{{rootPath}}\/images/g, imagesPath);
				htmlContent = htmlContent.replace(/\`\`\`([\s\S]+?)\`\`\`/gi, function (match, group) {
					if (group) {
						return _he2.default.encode(group, {
							useNamedReferences: true
						});
					}

					return '';
				});
				htmlContent = htmlContent.replace(/(---[\s\S]+---)/, '<h3>Preview</h3>');
			}

			var baseLexiconTheme = _lodash2.default.kebabCase(this.props.baseLexiconTheme);

			var filePath = _path2.default.join(process.cwd(), 'lexicon/build/' + baseLexiconTheme + '.css');

			var linkElement = '<link rel="stylesheet" href="' + filePath + '" />';

			htmlContent = '<html><head>' + linkElement + '</head><body class="lexicon-customizer-preview-box">' + htmlContent + '</body></html>';

			var lexiconHTMLPath = _path2.default.join(process.cwd(), 'lexicon/build/lexicon-preview.html');

			_fs2.default.writeFileSync(lexiconHTMLPath, htmlContent);

			lexiconHTMLPath += '?t=' + Date.now();

			return _react2.default.createElement(
				'div',
				{ className: 'preview-box' },
				_react2.default.createElement('webview', { autosize: 'on', maxWidth: '100%', src: lexiconHTMLPath })
			);
		}
	}]);

	return PreviewBox;
}(_react.Component);

;

exports.default = PreviewBox;