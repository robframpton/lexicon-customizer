import React, { Component } from 'react';
import { connect } from 'react-redux';

import { renderPreview } from '../actions/index';

const mapStateToProps = (state, ownProps) => {
	let { preview, previewLoading, selectedComponent } = state;

	let { cssPath, htmlPath } = preview;

	return {
		cssPath,
		htmlPath,
		previewLoading,
		selectedComponent
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		dispatch,
		onLoaded: () => {
			dispatch({
				loading: false,
				type: 'SET_PREVIEW_LOADING'
			});
		}
	}
};

class PreviewBox extends Component {
	componentDidMount() {
		const { dispatch, selectedComponent } = this.props;

		dispatch(renderPreview(selectedComponent));

		this.refs.webview.addEventListener('did-stop-loading', () => {
			setTimeout(() => {
				this.props.onLoaded();
			}, 100);
		});
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
		let previewLoadingMask = this.props.previewLoading ? this.renderPreviewLoadingMask(): '';

		return (
			<div className="preview-box">
				<webview autosize="on" maxWidth="100%" ref="webview" src={this.props.htmlPath}></webview>

				<a className="preview-box-dev-tools-btn" href="javascript:;" onClick={this.openDevTools.bind(this)}>Dev Tools</a>

				{previewLoadingMask}
			</div>
		);
	}

	renderPreviewLoadingMask() {
		return (
			<div className="preview-box-loading-mask">
				<span className="preview-box-loading-mask-text">Loading...</span>
			</div>
		);
	}

	openDevTools() {
		this.refs.webview.openDevTools();
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewBox);
