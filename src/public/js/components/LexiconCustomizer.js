import React, { Component } from 'react';

import _ from 'lodash';
import path from 'path';

import ComponentMenu from './ComponentMenu';
import Header from './Header';
import PreviewBox from './PreviewBox';
import VariablesEditor from './VariablesEditor';

import componentScraper from '../../../../lib/component-scraper';
import sass from '../../../../lib/sass';
import themeUtil from '../../../../lib/theme';
import UserConfig from '../../../../lib/user_config';

class LexiconCustomizer extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="lexicon-customizer">
				<Header />

				<div className="lexicon-customizer-content">

				</div>
			</div>
		)
	}
}

class LexiconCustomizer_OLD extends Component {
	constructor(props) {
		super(props);

		var customVariables = componentScraper.getVariablesFromFile(path.join(process.cwd(), 'lexicon/_custom_variables.scss'));

		var variables = Object.assign({}, props.baseVariables, customVariables);

		var config = userConfig.getConfig();

		this.state = {
			baseLexiconTheme: config.baseLexiconTheme || 'lexiconBase',
			componentFile: '_cards.scss',
			componentName: 'cards',
			components: {},
			folderHovering: false,
			styleHREF: path.join(process.cwd(), 'lexicon/build/lexicon-base.css'),
			theme: config.theme || ''
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
					onReset={this.handleReset.bind(this)}
					onBaseLexiconThemeChange={this.handleBaseLexiconThemeChange.bind(this)}
					onClearTheme={this.handleClearTheme.bind(this)}
					theme={this.state.theme}
				/>

				<div className="lexicon-customizer-content">
					<ComponentMenu
						components={this.state.components}
						onUserClick={this.handleComponentItemClick.bind(this)}
						selectedComponent={this.state.componentName}
					/>

					<PreviewBox
						baseLexiconTheme={this.state.baseLexiconTheme}
						componentFile={this.state.componentFile}
						componentName={this.state.componentName}
					/>

					<VariablesEditor
						componentFile={this.state.componentFile}
						componentName={this.state.componentName}
						theme={this.state.theme}
						variables={this.props.variables}
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

		if (themeUtil.isTheme(file.path)) {
			userConfig.setConfig('theme', file.path);

			state.theme = file.path;
		}

		this.setState(state);
	}

	handleReset(event) {
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

export default LexiconCustomizer