'use strict';

import _ from 'lodash';
import fs from 'fs';
import he from 'he';
import path from 'path';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';

import componentScraper from '../../../lib/component-scraper';
import sass from '../../../lib/sass';
import theme from '../../../lib/theme';
import UserConfig from '../../../lib/user_config';

var userConfig = new UserConfig();

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			configPanelOpen: false
		}
	}

	render() {
		var themePath = this.props.theme;

		if (themePath) {
			themePath = path.basename(themePath);
		}

		var configPanelClassName = 'lexicon-customizer-config-panel';

		if (this.state.configPanelOpen) {
			configPanelClassName += ' open';
		}

		var baseLexiconTheme = this.props.baseLexiconTheme;

		return (
			<header className="lexicon-customizer-header">
				<h1>Lexicon Customizer</h1>

				<div className="lexicon-customizer-actions">
					<a className="config-panel-toggle-btn" href="javascript:;" onClick={this.toggleConfigPanel}><img src="../images/cog_white.svg"></img></a>

					<div className={configPanelClassName}>
						<div className="radio">
							<label>
								<input checked={baseLexiconTheme == 'lexiconBase'} name="baseLexiconTheme" onChange={this.handleBaseLexiconThemeChange} type="radio" value="lexiconBase" />
								Lexicon Base
							</label>
						</div>
						<div className="radio">
							<label>
								<input checked={baseLexiconTheme == 'atlasTheme'} name="baseLexiconTheme" onChange={this.handleBaseLexiconThemeChange} type="radio" value="atlasTheme" />
								Atlast Theme
							</label>
						</div>

						<span>Current theme: {themePath}</span>

						<button className="btn btn-default" onClick={this.props.onReset}>Reset</button>
						<button className="btn btn-default" onClick={this.props.onClearTheme}>Clear Theme</button>
					</div>
				</div>
			</header>
		);
	}

	handleBaseLexiconThemeChange(event) {
		var value = event.currentTarget.value;

		this.props.onBaseLexiconThemeChange(value);
	}

	toggleConfigPanel() {
		this.setState({
			configPanelOpen: !this.state.configPanelOpen
		});
	}
};

class ComponentMenu extends Component {
	render() {
		return (
			<div className="component-menu">
				<h3>Componenets</h3>

				<ul className="component-list">
					{this.renderComponentList()}
				</ul>
			</div>
		);
	}

	renderComponentList() {
		var instance = this;

		var components = this.props.components;

		return Object.keys(components).map(function(name) {
			var file = components[name];

			var className = 'component-item';

			if (name == instance.props.componentName) {
				className += ' selected';
			}

			return (<li
				className={className}
				data-file={file}
				key={name}
			>
				<a href="javascript:;" data-file={file} data-name={name} onClick={instance.handleClick}>{name}</a>
			</li>);
		});
	}

	handleClick(event) {
		if (this.props.onUserClick) {
			this.props.onUserClick(event);
		}
	}
};

class PreviewBox extends Component {
	render() {
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
			htmlContent = htmlContent.replace(/(---[\s\S]+---)/, '<h3>Preview</h3>');
		}

		var baseLexiconTheme = _.kebabCase(this.props.baseLexiconTheme);

		var filePath = path.join(process.cwd(), 'lexicon/build/' + baseLexiconTheme + '.css');

		var linkElement = '<link rel="stylesheet" href="' + filePath + '" />'

		htmlContent = '<html><head>' + linkElement + '</head><body class="lexicon-customizer-preview-box">' + htmlContent + '</body></html>';

		var lexiconHTMLPath = path.join(process.cwd(), 'lexicon/build/lexicon-preview.html');

		fs.writeFileSync(lexiconHTMLPath, htmlContent);

		lexiconHTMLPath += '?t=' + Date.now();

		return (
			<div className="preview-box">
				<webview autosize="on" maxWidth="100%" src={lexiconHTMLPath}></webview>
			</div>
		);
	}
};

class VariablesEditor extends Component {
	render() {
		var instance = this;

		return (
			<div className="variables-editor">
				<h3>Variables</h3>

				<form>
					{this.renderInputs()}
				</form>
			</div>
		);
	}

	renderInputs() {
		var instance = this;

		var componentVariableMap = componentScraper.getComponentVariables(this.props.componentName, 'lexicon-base') || [];

		var variableMap = this.props.variables;

		return Object.keys(componentVariableMap).map(function(variableName) {
			var value = variableMap[variableName];

			var colorVariable = instance._isColorVariable(variableName, value);

			var inputProps = {
				'data-color-variable': colorVariable,
				className: 'form-control',
				name: variableName,
				onChange: instance.handleInput.bind(instance),
				onInput: instance.handleInput.bind(instance),
				value: variableMap[variableName]
			};

			var getSuggestionValue = function(suggestion) {
				return suggestion;
			};

			var renderSuggestion = function(suggestion) {
				return (<span>{suggestion}</span>);
			};

			return (
				<div className="form-group" key={variableName + '_wrapper'}>
					<label htmlFor={variableName}>{variableName}</label>

					<Autosuggest
						ref={variableName}
						getSuggestionValue={getSuggestionValue}
						inputProps={inputProps}
						renderSuggestion={renderSuggestion}
						suggestions={Object.keys(instance.props.variables)}
					/>
				</div>
			);
		});
	}

	getVariableMap() {
		return _.reduce(this.refs, function(result, item, index) {
			result[index] = item.input.value;

			return result;
		}, {});
	}

	handleInput(event) {
		var currentTarget = event.currentTarget;

		var variableName = currentTarget.getAttribute('name');
		var variableValue = currentTarget.value;

		if (this.props.onUserInput) {
			this.props.onUserInput(this.getVariableMap(), variableName);
		}
	}

	_isColorVariable(variableName, variableValue) {
		var colorVariable = false;

		if ((variableName.indexOf('-bg') != -1) || (variableName.indexOf('color') != -1)) {
			colorVariable = true;
		}

		return colorVariable;
	}
};

class LexiconCustomizer extends Component {
	constructor(props) {
		super(props);

		var customVariables = componentScraper.getVariablesFromFile(path.join(process.cwd(), 'lexicon/_custom_variables.scss'));

		var variables = _.assign({}, props.baseVariables, customVariables);

		var config = userConfig.getConfig();

		this.state = {
			baseLexiconTheme: config.baseLexiconTheme || 'lexiconBase',
			componentFile: '_cards.scss',
			componentName: 'cards',
			components: {},
			folderHovering: false,
			styleHREF: path.join(process.cwd(), 'lexicon/build/lexicon-base.css'),
			theme: config.theme || '',
			variables: variables
		}
	}

	componentDidMount() {
		var componentData = componentScraper.getLexiconBaseComponents();

		this.setState({
			components: componentData
		});

		this.attachDocumentEventListeners()
	}

	attachDocumentEventListeners() {
		var instance = this;

		document.addEventListener('dragleave', function(event) {
			if (event.target.className.indexOf('folder-hovering-mask') != -1) {
				instance.setState({
					folderHovering: false
				});
			}
		}, false);

		document.addEventListener('dragenter', function(event) {
			event.preventDefault();

			instance.setState({
				folderHovering: true
			});

			return false;
		}, false);

		document.addEventListener('drop', function(event) {
			event.preventDefault();

			if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
				instance.handleFileDrop(event);
			}

			return false;
		}, false);
	}

	render() {
		var folderHoveringMask = this.state.folderHovering ? <div className="folder-hovering-mask"><span>Drop theme to sync</span></div> : '';

		return (
			<div className="lexicon-customizer">
				<Header
					baseLexiconTheme={this.state.baseLexiconTheme}
					onReset={this.handleReset}
					onBaseLexiconThemeChange={this.handleBaseLexiconThemeChange}
					onClearTheme={this.handleClearTheme}
					theme={this.state.theme}
				/>

				<div className="lexicon-customizer-content">
					<ComponentMenu
						componentFile={this.state.componentFile}
						componentName={this.state.componentName}
						components={this.state.components}
						onUserClick={this.handleComponentItemClick}
					/>

					<PreviewBox
						baseLexiconTheme={this.state.baseLexiconTheme}
						componentFile={this.state.componentFile}
						componentName={this.state.componentName}
					/>

					<VariablesEditor
						componentFile={this.state.componentFile}
						componentName={this.state.componentName}
						onUserInput={this.handleUserInput.bind(this)}
						theme={this.state.theme}
						variables={this.state.variables}
					/>
				</div>

				{folderHoveringMask}
			</div>
		);
	}

	handleBaseLexiconThemeChange(value) {
		var state = {
			baseLexiconTheme: value
		};

		this.setState(state);

		this._buildLexiconBase();

		userConfig.setConfig(state);
	}

	handleClearTheme(event) {
		this.setState({
			theme: null
		});
	}

	handleComponentItemClick(event) {
		var currentTarget = event.currentTarget;

		this.setState({
			componentFile: currentTarget.getAttribute('data-file'),
			componentName: currentTarget.getAttribute('data-name')
		});
	}

	handleFileDrop(event) {
		var file = event.dataTransfer.files[0];

		var state = {
			folderHovering: false
		};

		if (theme.isTheme(file.path)) {
			userConfig.setConfig('theme', file.path);

			state.theme = file.path;
		}

		this.setState(state);
	}

	handleReset(event) {
		this.setState({
			variables: this.props.baseVariables
		});

		this._buildCustomVariablesFile({});
		this._buildLexiconBase();
	}

	handleUserInput(variableMap, variableName) {
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

		this._buildCustomVariablesFile(variableMap);
		this._buildLexiconBase(variableMap);
	}

	_buildCustomVariablesFile(variableMap) {
		sass.writeCustomVariablesFile(variableMap, this.state.theme);
	}

	_buildLexiconBase() {
		var instance = this;

		var baseLexiconTheme = _.kebabCase(this.state.baseLexiconTheme);

		sass.renderLexiconBase({
			baseLexiconTheme: baseLexiconTheme
		}, function(err, result) {
			instance.setState({
				styleHREF: path.join(process.cwd(), 'lexicon/build', baseLexiconTheme + '.css') + '?t=' + Date.now()
			});
		});
	}
};

var lexiconBaseVariables = componentScraper.mapLexiconVariables();

ReactDOM.render(<LexiconCustomizer baseVariables={lexiconBaseVariables} />, document.getElementById('main'));