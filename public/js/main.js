'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var componentScraper = require('../../lib/component-scraper');
var sass = require('../../lib/sass');

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
		}

		return (
			<div className="preview-box">
				<div dangerouslySetInnerHTML={{__html: htmlContent}}></div>
			</div>
		);
	}
});

var VariablesEditor = React.createClass({
	render: function() {
		var instance = this;

		var variableMap = componentScraper.getVariablesFromFile(this.props.componentFile);

		return (
			<div className="variables-editor">
				{Object.keys(variableMap).map(function(variableName) {
					var variableValue = variableMap[variableName];

					return (
						<div className="form-group">
							<label for={variableName}>{variableName}</label>
							<input
								className="form-control"
								defaultValue={variableValue}
								key={variableName}
								maxLength="100"
								name={variableName}
								onInput={instance.handleInput}
								ref={variableName}
								type="text"
							/>
						</div>
					);
				})}
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
		return {
			components: {},
			//styleHREF: '../../node_modules/lexicon/build/css/lexicon-base.css'
			styleHREF: path.join(process.cwd(), 'lexicon/build/lexicon-base.css')
		}
	},

	componentDidMount: function() {
		var instance = this;

		componentScraper.getLexiconBaseComponents(function(err, componentData) {
			instance.setState({
				components: componentData
			});
		});
	},

	render: function() {
		return (
			<div className="lexicon-customizer">
				<StyleLink href={this.state.styleHREF} />

				<ComponentMenu components={this.state.components} onUserClick={this.handleComponentItemClick} />

				<PreviewBox componentFile={this.state.componentFile} componentName={this.state.componentName} />

				<VariablesEditor
					componentFile={this.state.componentFile}
					componentName={this.state.componentName}
					onUserInput={this.handleUserInput}
				/>
			</div>
		);
	},

	handleComponentItemClick: function(event) {
		var currentTarget = event.currentTarget;

		this.setState({
			componentFile: currentTarget.getAttribute('data-file'),
			componentName: currentTarget.getAttribute('data-name')
		});
	},

	handleUserInput: function(variableMap, variableName) {
		var instance = this;

		this._buildLexiconBase(variableMap);
	},

	_buildLexiconBase: _.debounce(function(variableMap) {
		var instance = this;

		sass.writeVariablesFile(this.state.componentName, this._generateVariablesString(variableMap))

		sass.renderLexiconBase(function(err, result) {
			instance.setState({
				styleHREF: path.join(process.cwd(), 'lexicon/build/lexicon-base.css') + '?t=' + Date.now()
			});
		});
	}, 200),

	_generateVariablesString: function(variableMap) {
		return _.reduce(variableMap, function(result, item, index) {
			result += index + ': ' + item + ';\n'

			return result
		}, '');
	}
});

ReactDOM.render(<LexiconCustomizer />, document.getElementById('main'));