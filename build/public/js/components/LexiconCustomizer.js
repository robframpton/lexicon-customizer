'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ComponentMenu = require('./ComponentMenu');

var _ComponentMenu2 = _interopRequireDefault(_ComponentMenu);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _PreviewBox = require('./PreviewBox');

var _PreviewBox2 = _interopRequireDefault(_PreviewBox);

var _VariablesEditor = require('./VariablesEditor');

var _VariablesEditor2 = _interopRequireDefault(_VariablesEditor);

var _componentScraper = require('../../../../lib/component-scraper');

var _componentScraper2 = _interopRequireDefault(_componentScraper);

var _sass = require('../../../../lib/sass');

var _sass2 = _interopRequireDefault(_sass);

var _theme = require('../../../../lib/theme');

var _theme2 = _interopRequireDefault(_theme);

var _user_config = require('../../../../lib/user_config');

var _user_config2 = _interopRequireDefault(_user_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LexiconCustomizer = function (_Component) {
	_inherits(LexiconCustomizer, _Component);

	function LexiconCustomizer(props) {
		_classCallCheck(this, LexiconCustomizer);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(LexiconCustomizer).call(this, props));
	}

	_createClass(LexiconCustomizer, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'lexicon-customizer' },
				_react2.default.createElement(_Header2.default, null),
				_react2.default.createElement('div', { className: 'lexicon-customizer-content' })
			);
		}
	}]);

	return LexiconCustomizer;
}(_react.Component);

var LexiconCustomizer_OLD = function (_Component2) {
	_inherits(LexiconCustomizer_OLD, _Component2);

	function LexiconCustomizer_OLD(props) {
		_classCallCheck(this, LexiconCustomizer_OLD);

		var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(LexiconCustomizer_OLD).call(this, props));

		var customVariables = _componentScraper2.default.getVariablesFromFile(_path2.default.join(process.cwd(), 'lexicon/_custom_variables.scss'));

		var variables = Object.assign({}, props.baseVariables, customVariables);

		var config = userConfig.getConfig();

		_this2.state = {
			baseLexiconTheme: config.baseLexiconTheme || 'lexiconBase',
			componentFile: '_cards.scss',
			componentName: 'cards',
			components: {},
			folderHovering: false,
			styleHREF: _path2.default.join(process.cwd(), 'lexicon/build/lexicon-base.css'),
			theme: config.theme || ''
		};
		return _this2;
	}

	_createClass(LexiconCustomizer_OLD, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var componentData = _componentScraper2.default.getLexiconBaseComponents();

			this.setState({
				components: componentData
			});

			this.attachDocumentEventListeners();
		}
	}, {
		key: 'attachDocumentEventListeners',
		value: function attachDocumentEventListeners() {
			var instance = this;

			document.addEventListener('dragleave', function (event) {
				if (event.target.className.indexOf('folder-hovering-mask') != -1) {
					instance.setState({
						folderHovering: false
					});
				}
			}, false);

			document.addEventListener('dragenter', function (event) {
				event.preventDefault();

				instance.setState({
					folderHovering: true
				});

				return false;
			}, false);

			document.addEventListener('drop', function (event) {
				event.preventDefault();

				if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
					instance.handleFileDrop(event);
				}

				return false;
			}, false);
		}
	}, {
		key: 'render',
		value: function render() {
			var folderHoveringMask = this.state.folderHovering ? _react2.default.createElement(
				'div',
				{ className: 'folder-hovering-mask' },
				_react2.default.createElement(
					'span',
					null,
					'Drop theme to sync'
				)
			) : '';

			return _react2.default.createElement(
				'div',
				{ className: 'lexicon-customizer' },
				_react2.default.createElement(_Header2.default, {
					baseLexiconTheme: this.state.baseLexiconTheme,
					onReset: this.handleReset.bind(this),
					onBaseLexiconThemeChange: this.handleBaseLexiconThemeChange.bind(this),
					onClearTheme: this.handleClearTheme.bind(this),
					theme: this.state.theme
				}),
				_react2.default.createElement(
					'div',
					{ className: 'lexicon-customizer-content' },
					_react2.default.createElement(_ComponentMenu2.default, {
						components: this.state.components,
						onUserClick: this.handleComponentItemClick.bind(this),
						selectedComponent: this.state.componentName
					}),
					_react2.default.createElement(_PreviewBox2.default, {
						baseLexiconTheme: this.state.baseLexiconTheme,
						componentFile: this.state.componentFile,
						componentName: this.state.componentName
					}),
					_react2.default.createElement(_VariablesEditor2.default, {
						componentFile: this.state.componentFile,
						componentName: this.state.componentName,
						theme: this.state.theme,
						variables: this.props.variables
					})
				),
				folderHoveringMask
			);
		}
	}, {
		key: 'handleBaseLexiconThemeChange',
		value: function handleBaseLexiconThemeChange(value) {
			var state = {
				baseLexiconTheme: value
			};

			this.setState(state);

			this._buildLexiconBase();

			userConfig.setConfig(state);
		}
	}, {
		key: 'handleClearTheme',
		value: function handleClearTheme(event) {
			this.setState({
				theme: null
			});
		}
	}, {
		key: 'handleComponentItemClick',
		value: function handleComponentItemClick(event) {
			var currentTarget = event.currentTarget;

			this.setState({
				componentFile: currentTarget.getAttribute('data-file'),
				componentName: currentTarget.getAttribute('data-name')
			});
		}
	}, {
		key: 'handleFileDrop',
		value: function handleFileDrop(event) {
			var file = event.dataTransfer.files[0];

			var state = {
				folderHovering: false
			};

			if (_theme2.default.isTheme(file.path)) {
				userConfig.setConfig('theme', file.path);

				state.theme = file.path;
			}

			this.setState(state);
		}
	}, {
		key: 'handleReset',
		value: function handleReset(event) {
			store.dispatch({
				type: 'RESET_VARIABLES',
				variables: this.props.baseVariables
			});

			this._buildCustomVariablesFile({});
			this._buildLexiconBase();
		}

		// handleUserInput(variableMap, test) {
		// 	var instance = this;

		// 	var mergedVariables = _.assign({}, this.state.variables, variableMap);

		// 	this.setState({
		// 		variables: mergedVariables
		// 	});

		// 	var baseVariables = this.props.baseVariables;

		// 	variableMap = _.reduce(mergedVariables, function(result, item, index) {
		// 		if (item != baseVariables[index]) {
		// 			result[index] = item;
		// 		}

		// 		return result;
		// 	}, {});

		// 	this._buildCustomVariablesFile(variableMap);
		// 	this._buildLexiconBase(variableMap);
		// }

	}, {
		key: '_buildCustomVariablesFile',
		value: function _buildCustomVariablesFile(variableMap) {
			_sass2.default.writeCustomVariablesFile(variableMap, this.state.theme);
		}
	}, {
		key: '_buildLexiconBase',
		value: function _buildLexiconBase() {
			var instance = this;

			var baseLexiconTheme = _lodash2.default.kebabCase(this.state.baseLexiconTheme);

			_sass2.default.renderLexiconBase({
				baseLexiconTheme: baseLexiconTheme
			}, function (err, result) {
				instance.setState({
					styleHREF: _path2.default.join(process.cwd(), 'lexicon/build', baseLexiconTheme + '.css') + '?t=' + Date.now()
				});
			});
		}
	}]);

	return LexiconCustomizer_OLD;
}(_react.Component);

;

exports.default = LexiconCustomizer;