'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _he = require('he');

var _he2 = _interopRequireDefault(_he);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAutosuggest = require('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _componentScraper = require('../../../lib/component-scraper');

var _componentScraper2 = _interopRequireDefault(_componentScraper);

var _sass = require('../../../lib/sass');

var _sass2 = _interopRequireDefault(_sass);

var _theme = require('../../../lib/theme');

var _theme2 = _interopRequireDefault(_theme);

var _user_config = require('../../../lib/user_config');

var _user_config2 = _interopRequireDefault(_user_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var userConfig = new _user_config2.default();

var TestElement = function (_React$Component) {
	_inherits(TestElement, _React$Component);

	function TestElement() {
		_classCallCheck(this, TestElement);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(TestElement).apply(this, arguments));
	}

	_createClass(TestElement, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', null);
		}
	}]);

	return TestElement;
}(_react2.default.Component);

var Header = _react2.default.createClass({
	getInitialState: function getInitialState() {
		return {
			configPanelOpen: false
		};
	},

	render: function render() {
		var themePath = this.props.theme;

		if (themePath) {
			themePath = _path2.default.basename(themePath);
		}

		var configPanelClassName = 'lexicon-customizer-config-panel';

		if (this.state.configPanelOpen) {
			configPanelClassName += ' open';
		}

		var baseLexiconTheme = this.props.baseLexiconTheme;

		return _react2.default.createElement(
			'header',
			{ className: 'lexicon-customizer-header' },
			_react2.default.createElement(
				'h1',
				null,
				'Lexicon Customizer'
			),
			_react2.default.createElement(
				'div',
				{ className: 'lexicon-customizer-actions' },
				_react2.default.createElement(
					'a',
					{ className: 'config-panel-toggle-btn', href: 'javascript:;', onClick: this.toggleConfigPanel },
					_react2.default.createElement('img', { src: '../images/cog_white.svg' })
				),
				_react2.default.createElement(
					'div',
					{ className: configPanelClassName },
					_react2.default.createElement(
						'div',
						{ className: 'radio' },
						_react2.default.createElement(
							'label',
							null,
							_react2.default.createElement('input', { checked: baseLexiconTheme == 'lexiconBase', name: 'baseLexiconTheme', onChange: this.handleBaseLexiconThemeChange, type: 'radio', value: 'lexiconBase' }),
							'Lexicon Base'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'radio' },
						_react2.default.createElement(
							'label',
							null,
							_react2.default.createElement('input', { checked: baseLexiconTheme == 'atlasTheme', name: 'baseLexiconTheme', onChange: this.handleBaseLexiconThemeChange, type: 'radio', value: 'atlasTheme' }),
							'Atlast Theme'
						)
					),
					_react2.default.createElement(
						'span',
						null,
						'Current theme: ',
						themePath
					),
					_react2.default.createElement(
						'button',
						{ className: 'btn btn-default', onClick: this.props.onReset },
						'Reset'
					),
					_react2.default.createElement(
						'button',
						{ className: 'btn btn-default', onClick: this.props.onClearTheme },
						'Clear Theme'
					)
				)
			)
		);
	},

	handleBaseLexiconThemeChange: function handleBaseLexiconThemeChange(event) {
		var value = event.currentTarget.value;

		this.props.onBaseLexiconThemeChange(value);
	},

	toggleConfigPanel: function toggleConfigPanel() {
		this.setState({
			configPanelOpen: !this.state.configPanelOpen
		});
	}
});

var ComponentMenu = _react2.default.createClass({
	render: function render() {
		return _react2.default.createElement(
			'div',
			{ className: 'component-menu' },
			_react2.default.createElement(
				'h3',
				null,
				'Componenets'
			),
			_react2.default.createElement(
				'ul',
				{ className: 'component-list' },
				this.renderComponentList()
			)
		);
	},

	renderComponentList: function renderComponentList() {
		var instance = this;

		var components = this.props.components;

		return Object.keys(components).map(function (name) {
			var file = components[name];

			var className = 'component-item';

			if (name == instance.props.componentName) {
				className += ' selected';
			}

			return _react2.default.createElement(
				'li',
				{
					className: className,
					'data-file': file,
					key: name
				},
				_react2.default.createElement(
					'a',
					{ href: 'javascript:;', 'data-file': file, 'data-name': name, onClick: instance.handleClick },
					name
				)
			);
		});
	},

	handleClick: function handleClick(event) {
		if (this.props.onUserClick) {
			this.props.onUserClick(event);
		}
	}
});

var StyleLink = _react2.default.createClass({
	render: function render() {
		return _react2.default.createElement('link', { rel: 'stylesheet', href: this.props.href });
	}
});

var PreviewBox = _react2.default.createClass({
	componentDidMount: function componentDidMount() {
		var webview = document.getElementsByTagName('webview')[0];

		webview.addEventListener('dom-ready', function () {
			//webview.openDevTools();
		});
	},

	render: function render() {
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
});

var VariablesEditor = _react2.default.createClass({
	render: function render() {
		var instance = this;

		return _react2.default.createElement(
			'div',
			{ className: 'variables-editor' },
			_react2.default.createElement(
				'h3',
				null,
				'Variables'
			),
			_react2.default.createElement(
				'form',
				null,
				this.renderInputs()
			)
		);
	},

	renderInputs: function renderInputs() {
		var instance = this;

		var componentVariableMap = _componentScraper2.default.getComponentVariables(this.props.componentName, 'lexicon-base') || [];

		var variableMap = this.props.variables;

		return Object.keys(componentVariableMap).map(function (variableName) {
			var value = variableMap[variableName];

			var colorVariable = instance._isColorVariable(variableName, value);

			var inputProps = {
				'data-color-variable': colorVariable,
				className: 'form-control',
				name: variableName,
				onChange: instance.handleInput,
				onInput: instance.handleInput,
				value: variableMap[variableName]
			};

			var getSuggestionValue = function getSuggestionValue(suggestion) {
				return suggestion;
			};

			var renderSuggestion = function renderSuggestion(suggestion) {
				return _react2.default.createElement(
					'span',
					null,
					suggestion
				);
			};

			return _react2.default.createElement(
				'div',
				{ className: 'form-group', key: variableName + '_wrapper' },
				_react2.default.createElement(
					'label',
					{ htmlFor: variableName },
					variableName
				),
				_react2.default.createElement(_reactAutosuggest2.default, {
					ref: variableName,
					getSuggestionValue: getSuggestionValue,
					inputProps: inputProps,
					renderSuggestion: renderSuggestion,
					suggestions: Object.keys(instance.props.variables)
				})
			);
		});
	},

	getVariableMap: function getVariableMap() {
		return _lodash2.default.reduce(this.refs, function (result, item, index) {
			result[index] = item.input.value;

			return result;
		}, {});
	},

	handleInput: function handleInput(event) {
		var currentTarget = event.currentTarget;

		var variableName = currentTarget.getAttribute('name');
		var variableValue = currentTarget.value;

		if (this.props.onUserInput) {
			this.props.onUserInput(this.getVariableMap(), variableName);
		}
	},

	_isColorVariable: function _isColorVariable(variableName, variableValue) {
		var colorVariable = false;

		if (variableName.indexOf('-bg') != -1 || variableName.indexOf('color') != -1) {
			colorVariable = true;
		}

		return colorVariable;
	}
});

var LexiconCustomizer = _react2.default.createClass({
	getInitialState: function getInitialState() {
		var customVariables = _componentScraper2.default.getVariablesFromFile(_path2.default.join(process.cwd(), 'lexicon/_custom_variables.scss'));

		var variables = _lodash2.default.assign({}, this.props.baseVariables, customVariables);

		var config = userConfig.getConfig();

		return {
			baseLexiconTheme: config.baseLexiconTheme || 'lexiconBase',
			componentFile: '_cards.scss',
			componentName: 'cards',
			components: {},
			folderHovering: false,
			styleHREF: _path2.default.join(process.cwd(), 'lexicon/build/lexicon-base.css'),
			theme: config.theme || '',
			variables: variables
		};
	},

	componentDidMount: function componentDidMount() {
		var componentData = _componentScraper2.default.getLexiconBaseComponents();

		this.setState({
			components: componentData
		});

		this.attachDocumentEventListeners();
	},

	attachDocumentEventListeners: function attachDocumentEventListeners() {
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
	},

	render: function render() {
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
			_react2.default.createElement(Header, {
				baseLexiconTheme: this.state.baseLexiconTheme,
				onReset: this.handleReset,
				onBaseLexiconThemeChange: this.handleBaseLexiconThemeChange,
				onClearTheme: this.handleClearTheme,
				theme: this.state.theme
			}),
			_react2.default.createElement(
				'div',
				{ className: 'lexicon-customizer-content' },
				_react2.default.createElement(ComponentMenu, {
					componentFile: this.state.componentFile,
					componentName: this.state.componentName,
					components: this.state.components,
					onUserClick: this.handleComponentItemClick
				}),
				_react2.default.createElement(PreviewBox, {
					baseLexiconTheme: this.state.baseLexiconTheme,
					componentFile: this.state.componentFile,
					componentName: this.state.componentName
				}),
				_react2.default.createElement(VariablesEditor, {
					componentFile: this.state.componentFile,
					componentName: this.state.componentName,
					onUserInput: this.handleUserInput,
					theme: this.state.theme,
					variables: this.state.variables
				})
			),
			folderHoveringMask
		);
	},

	handleBaseLexiconThemeChange: function handleBaseLexiconThemeChange(value) {
		var state = {
			baseLexiconTheme: value
		};

		this.setState(state);

		this._buildLexiconBase();

		userConfig.setConfig(state);
	},

	handleClearTheme: function handleClearTheme(event) {
		this.setState({
			theme: null
		});
	},

	handleComponentItemClick: function handleComponentItemClick(event) {
		var currentTarget = event.currentTarget;

		this.setState({
			componentFile: currentTarget.getAttribute('data-file'),
			componentName: currentTarget.getAttribute('data-name')
		});
	},

	handleFileDrop: function handleFileDrop(event) {
		var file = event.dataTransfer.files[0];

		var state = {
			folderHovering: false
		};

		if (_theme2.default.isTheme(file.path)) {
			userConfig.setConfig('theme', file.path);

			state.theme = file.path;
		}

		this.setState(state);
	},

	handleReset: function handleReset(event) {
		this.setState({
			variables: this.props.baseVariables
		});

		this._buildCustomVariablesFile({});
		this._buildLexiconBase();
	},

	handleUserInput: function handleUserInput(variableMap, variableName) {
		var instance = this;

		var mergedVariables = _lodash2.default.assign({}, this.state.variables, variableMap);

		this.setState({
			variables: mergedVariables
		});

		var baseVariables = this.props.baseVariables;

		variableMap = _lodash2.default.reduce(mergedVariables, function (result, item, index) {
			if (item != baseVariables[index]) {
				result[index] = item;
			}

			return result;
		}, {});

		this._buildCustomVariablesFile(variableMap);
		this._buildLexiconBase(variableMap);
	},

	_buildCustomVariablesFile: _lodash2.default.debounce(function (variableMap) {
		_sass2.default.writeCustomVariablesFile(variableMap, this.state.theme);
	}, 200),

	_buildLexiconBase: _lodash2.default.debounce(function () {
		var instance = this;

		var baseLexiconTheme = _lodash2.default.kebabCase(this.state.baseLexiconTheme);

		_sass2.default.renderLexiconBase({
			baseLexiconTheme: baseLexiconTheme
		}, function (err, result) {
			instance.setState({
				styleHREF: _path2.default.join(process.cwd(), 'lexicon/build', baseLexiconTheme + '.css') + '?t=' + Date.now()
			});
		});
	}, 200)
});

var lexiconBaseVariables = _componentScraper2.default.mapLexiconVariables();

_reactDom2.default.render(_react2.default.createElement(LexiconCustomizer, { baseVariables: lexiconBaseVariables }), document.getElementById('main'));