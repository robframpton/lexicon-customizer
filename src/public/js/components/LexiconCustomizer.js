import React, { Component } from 'react';

import _ from 'lodash';
import path from 'path';

import ComponentSideMenu from '../containers/ComponentSideMenu';
import Header from './Header';
import PreviewBox from '../containers/PreviewBox';

import VariablesEditor from '../containers/VariablesEditor';

import componentScraper from '../../../../lib/component-scraper';
import sass from '../../../../lib/sass';
import themeUtil from '../../../../lib/theme';
import UserConfig from '../../../../lib/user_config';

class LexiconCustomizer extends Component {
	render() {
		return (
			<div className="lexicon-customizer">
				<Header />

				<div className="lexicon-customizer-content">
					<ComponentSideMenu header="Components" />

					<PreviewBox />

					<VariablesEditor />
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

	handleBaseLexiconThemeChange(value) {
		var state = {
			baseLexiconTheme: value
		};

		this.setState(state);

		this._buildLexiconBase();

		userConfig.setConfig(state);
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
};

export default LexiconCustomizer