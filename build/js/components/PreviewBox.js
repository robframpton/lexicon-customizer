'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _index = require('../actions/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreviewBox = function (_Component) {
	_inherits(PreviewBox, _Component);

	function PreviewBox(props) {
		_classCallCheck(this, PreviewBox);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PreviewBox).call(this, props));

		var state = {};

		if (!props.htmlPath) {
			state.previewLoading = true;
		}

		_this.state = state;
		return _this;
	}

	_createClass(PreviewBox, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var webview = this.refs.webview;


			if (webview && !this._webviewLoadListener) {
				webview.addEventListener('did-stop-loading', this.handleDidStopLoading.bind(this));

				this._webviewLoadListener = true;
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(_ref) {
			var cssPath = _ref.cssPath;
			var htmlPath = _ref.htmlPath;

			this._setWebviewCssPath(cssPath);

			if (htmlPath !== this.props.htmlPath) {
				this.setState({
					previewLoading: true
				});
			}
		}
	}, {
		key: 'handleDidStopLoading',
		value: function handleDidStopLoading() {
			var _props = this.props;
			var cssPath = _props.cssPath;
			var didStopLoading = _props.didStopLoading;


			this._setWebviewCssPath(cssPath);

			this.setState({
				previewLoading: false
			});

			if (didStopLoading) {
				didStopLoading();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var htmlPath = this.props.htmlPath;
			var previewLoading = this.state.previewLoading;


			var previewLoadingMask = previewLoading ? this.renderPreviewLoadingMask() : '';
			var webview = htmlPath ? this.renderWebview() : '';

			return _react2.default.createElement(
				'div',
				{ className: 'preview-box' },
				webview,
				previewLoadingMask
			);
		}
	}, {
		key: 'renderPreviewLoadingMask',
		value: function renderPreviewLoadingMask() {
			return _react2.default.createElement(
				'div',
				{ className: 'preview-box-loading-mask' },
				_react2.default.createElement(
					'div',
					{ className: 'preview-box-loading-mask-text' },
					_react2.default.createElement(
						'div',
						{ className: 'spinner' },
						_react2.default.createElement('div', { className: 'rect1' }),
						_react2.default.createElement('div', { className: 'rect2' }),
						_react2.default.createElement('div', { className: 'rect3' }),
						_react2.default.createElement('div', { className: 'rect4' }),
						_react2.default.createElement('div', { className: 'rect5' })
					)
				)
			);
		}
	}, {
		key: 'renderWebview',
		value: function renderWebview() {
			return _react2.default.createElement('webview', {
				autosize: 'on',
				id: 'webview',
				maxWidth: '100%',
				ref: 'webview',
				src: this.props.htmlPath
			});
		}
	}, {
		key: '_setWebviewCssPath',
		value: function _setWebviewCssPath(cssPath) {
			var scriptString = '\n\t\t\tvar lexiconStylesheetLink = document.getElementById(\'lexiconStylesheetLink\');\n\t\t\tvar lexiconStylesheetLinkHREF = lexiconStylesheetLink.getAttribute(\'href\');\n\n\t\t\tif (lexiconStylesheetLinkHREF != \'' + cssPath + '\') {\n\t\t\t\tlexiconStylesheetLink.setAttribute(\'href\', \'' + cssPath + '\')\n\t\t\t};\n\t\t';

			if (cssPath && this.refs.webview && this.refs.webview.executeJavaScript) {
				this.refs.webview.executeJavaScript(scriptString);
			}
		}
	}]);

	return PreviewBox;
}(_react.Component);

;

PreviewBox.propTypes = {
	cssPath: _react.PropTypes.string,
	didStopLoading: _react.PropTypes.func,
	htmlPath: _react.PropTypes.string
};

exports.default = PreviewBox;