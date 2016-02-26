import React, { Component } from 'react';
import { connect } from 'react-redux';

import { renderPreview } from '../actions/index';

const mapStateToProps = (state, ownProps) => {
	let { preview, selectedComponent } = state;

	let { cssPath, htmlPath } = preview;

	return {
		cssPath,
		htmlPath,
		selectedComponent
	};
};

class PreviewBox extends Component {
	componentDidMount() {
		const { dispatch, selectedComponent } = this.props;

		dispatch(renderPreview(selectedComponent));
	}

	componentWillReceiveProps() {
		let { cssPath } = this.props;

		let scriptString = `
			var lexiconStylesheetLink = document.getElementById('lexiconStylesheetLink');
			var lexiconStylesheetLinkHREF = lexiconStylesheetLink.getAttribute('href');

			if (lexiconStylesheetLinkHREF != '${cssPath}') {
				lexiconStylesheetLink.setAttribute('href', '${cssPath}')
			};
		`;

		this.refs.webview.executeJavaScript(scriptString);
	}

	render() {
		return (
			<div className="preview-box">
				<webview autosize="on" maxWidth="100%" ref="webview" src={this.props.htmlPath}></webview>

				<a className="preview-box-dev-tools-btn" href="javascript:;" onClick={this.openDevTools.bind(this)}>Dev Tools</a>
			</div>
		);
	}

	openDevTools() {
		this.refs.webview.openDevTools();
	}
}

export default connect(mapStateToProps)(PreviewBox);
