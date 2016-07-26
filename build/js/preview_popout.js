'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _PreviewBox = require('../js/components/PreviewBox');

var _PreviewBox2 = _interopRequireDefault(_PreviewBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BrowserWindow = _electron.remote.BrowserWindow;

var LexiconPopoutPreview = function (_Component) {
	_inherits(LexiconPopoutPreview, _Component);

	function LexiconPopoutPreview(props) {
		_classCallCheck(this, LexiconPopoutPreview);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LexiconPopoutPreview).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(LexiconPopoutPreview, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var parentWindow = BrowserWindow.fromId(1);

			_electron.ipcRenderer.on('preview-data', this.handlePreviewData.bind(this));

			parentWindow.send('request-preview-data');

			this.parentWindow = parentWindow;
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_PreviewBox2.default, _extends({
				devToolsClosed: this.handleDevToolsClosed.bind(this)
			}, this.state));
		}
	}, {
		key: 'handleDevToolsClosed',
		value: function handleDevToolsClosed(event) {
			this.parentWindow.send('devtools-open', false);
		}
	}, {
		key: 'handlePreviewData',
		value: function handlePreviewData(event, data) {
			this.setState(data);
		}
	}]);

	return LexiconPopoutPreview;
}(_react.Component);

var render = function render() {
	_reactDom2.default.render(_react2.default.createElement(LexiconPopoutPreview, null), document.getElementById('main'));
};

render();