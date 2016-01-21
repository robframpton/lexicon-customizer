'use strict';

var _ = require('lodash');
var fs = require('fs');
var he = require('he');
var path = require('path');

var componentScraper = require('../../lib/component-scraper');
var sass = require('../../lib/sass');
var theme = require('../../lib/theme');
var UserConfig = require('../../lib/user_config');

var userConfig = new UserConfig();

document.addEventListener('dragover', function(event) {
	event.preventDefault();
	//console.log(event);
	return false;
}, false);

var Header = React.createClass({
	getInitialState: function() {
		return {
			configPanelOpen: false
		};
	},

	render: function() {
		var themePath = this.props.theme;

		if (themePath) {
			themePath = path.basename(themePath);
		}

		var configPanelClassName = 'lexicon-customizer-config-panel';

		if (this.state.configPanelOpen) {
			configPanelClassName += ' open';
		}

		return (
			<header className="lexicon-customizer-header">
				<h1>Lexicon Customizer</h1>

				<div className="lexicon-customizer-actions">
					<button className="btn btn-default" onClick={this.toggleConfigPanel}>Config</button>

					<div className={configPanelClassName}>
						<span>Current theme: {themePath}</span>

						<button className="btn btn-default" onClick={this.props.onReset}>Reset</button>
						<button className="btn btn-default" onClick={this.props.onClearTheme}>Clear Theme</button>
					</div>
				</div>
			</header>
		);
	},

	toggleConfigPanel: function() {
		this.setState({
			configPanelOpen: !this.state.configPanelOpen
		});
	}
});

var ComponentMenu = React.createClass({
	render: function() {
		var instance = this;

		var components = this.props.components;

		return (
			<div className="component-menu">
				<ul className="component-list">
					{Object.keys(components).map(function(name) {
						var file = components[name];
						return (<li
							className="component-item"
							data-file={file}
							key={name}
						>
							<a href="javascript:;" data-file={file} data-name={name} onClick={instance.handleClick}>{name}</a>
						</li>);
					})}
				</ul>
			</div>
		);
	},

	handleClick: function(event) {
		if (this.props.onUserClick) {
			this.props.onUserClick(event);
		}
	}
});

var StyleLink = React.createClass({
	render: function() {
		return (
			<link rel="stylesheet" href={this.props.href} />
		);
	}
});

var PreviewBox = React.createClass({
	render: function() {
		var componentName = this.props.componentName;

		var htmlContent = '';

		if (componentName) {
			var componentHTMLFileName = componentName + '.html';

			if (!fs.exists(path.join(process.cwd(), 'node_modules/lexicon/src/content', componentHTMLFileName))) {
				componentHTMLFileName = componentHTMLFileName.replace('-', '_');
			}

			htmlContent = fs.readFileSync(path.join(process.cwd(), 'node_modules/lexicon/src/content', componentHTMLFileName), {
				encoding: 'utf8'
			});

			var imagesPath = path.join(process.cwd(), 'node_modules/lexicon/src/images');

			htmlContent = htmlContent.replace(/\.\.\/\.\.\/images/g, imagesPath);
			htmlContent = htmlContent.replace(/{{rootPath}}\/images/g, imagesPath);
			htmlContent = htmlContent.replace(/\`\`\`([\s\S]+?)\`\`\`/gi, function(match, group) {
				if (group) {
					return he.encode(group, {
						useNamedReferences: true
					});
				}

				return '';
			});
		}

		return (
			<div className="preview-box">
				<div className="lexicon-base" dangerouslySetInnerHTML={{__html: htmlContent}}></div>
			</div>
		);
	}
});

var VariablesEditor = React.createClass({
	render: function() {
		var instance = this;

		var componentVariableMap = componentScraper.getComponentVariables(this.props.componentName, 'lexicon-base') || [];

		var variableMap = this.props.variables;

		return (
			<div className="variables-editor">
				<h2>SASS Variables</h2>

				<form>
					{Object.keys(componentVariableMap).map(function(variableName) {
						return (
							<div className="form-group" key={variableName + '_wrapper'}>
								<label htmlFor={variableName}>{variableName}</label>
								<input
									className="form-control"
									key={variableName}
									maxLength="100"
									name={variableName}
									onInput={instance.handleInput}
									ref={variableName}
									type="text"
									value={variableMap[variableName]}
								/>
							</div>
						);
					})}
				</form>
			</div>
		);
	},

	getVariableMap: function() {
		return _.reduce(this.refs, function(result, item, index) {
			result[index] = item.value;

			return result;
		}, {});
	},

	handleInput: function(event) {
		var currentTarget = event.currentTarget;

		var variableName = currentTarget.getAttribute('name');
		var variableValue = currentTarget.value;

		if (this.props.onUserInput) {
			this.props.onUserInput(this.getVariableMap(), variableName);
		}
	}
});

var LexiconCustomizer = React.createClass({
	getInitialState: function() {
		var customVariables = componentScraper.getVariablesFromFile(path.join(process.cwd(), 'lexicon/_custom_variables.scss'));

		var variables = _.assign({}, this.props.baseVariables, customVariables);

		var config = userConfig.getConfig();

		return {
			componentFile: '_cards.scss',
			componentName: 'cards',
			components: {},
			styleHREF: path.join(process.cwd(), 'lexicon/build/lexicon-base.css'),
			theme: config.theme || '',
			variables: variables
		}
	},

	componentDidMount: function() {
		var instance = this;

		var componentData = componentScraper.getLexiconBaseComponents();

		instance.setState({
			components: componentData
		});

		document.addEventListener('drop', function(event) {
			event.preventDefault();

			if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
				instance.handleFileDrop(event);
			}

			return false;
		}, false);
	},

	render: function() {
		return (
			<div className="lexicon-customizer">
				<Header
					theme={this.state.theme}
					onReset={this.handleReset}
					onClearTheme={this.handleClearTheme}
				/>

				<StyleLink href={this.state.styleHREF} />

				<ComponentMenu components={this.state.components} onUserClick={this.handleComponentItemClick} />

				<PreviewBox
					componentFile={this.state.componentFile}
					componentName={this.state.componentName}
				/>

				<VariablesEditor
					componentFile={this.state.componentFile}
					componentName={this.state.componentName}
					onUserInput={this.handleUserInput}
					theme={this.state.theme}
					variables={this.state.variables}
				/>
			</div>
		);
	},

	handleClearTheme: function(event) {
		this.setState({
			theme: null
		});
	},

	handleComponentItemClick: function(event) {
		var currentTarget = event.currentTarget;

		this.setState({
			componentFile: currentTarget.getAttribute('data-file'),
			componentName: currentTarget.getAttribute('data-name')
		});
	},

	handleFileDrop: function(event) {
		var file = event.dataTransfer.files[0];

		if (theme.isTheme(file.path)) {
			userConfig.setConfig('theme', file.path);

			this.setState({
				theme: file.path
			});
		}
	},

	handleReset: function(event) {
		this.setState({
			variables: this.props.baseVariables
		});

		this._buildLexiconBase({});
	},

	handleUserInput: function(variableMap, variableName) {
		var instance = this;

		var mergedVariables = _.assign({}, this.state.variables, variableMap);

		this.setState({
			variables: mergedVariables
		});

		var baseVariables = this.props.baseVariables;

		variableMap = _.reduce(mergedVariables, function(result, item, index) {
			if (item != baseVariables[index]) {
				result[index] = item;
			}

			return result;
		}, {});

		this._buildLexiconBase(variableMap);
	},

	_buildLexiconBase: _.debounce(function(variableMap) {
		var instance = this;

		sass.writeCustomVariablesFile(variableMap, this.state.theme);

		sass.renderLexiconBase(function(err, result) {
			instance.setState({
				styleHREF: path.join(process.cwd(), 'lexicon/build/lexicon-base.css') + '?t=' + Date.now()
			});
		});
	}, 200)
});

var lexiconBaseVariables = componentScraper.mapLexiconVariables();

ReactDOM.render(<LexiconCustomizer baseVariables={lexiconBaseVariables} />, document.getElementById('main'));