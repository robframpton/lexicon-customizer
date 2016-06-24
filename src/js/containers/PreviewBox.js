import React, { Component } from 'react';
import { connect } from 'react-redux';

import { renderPreview } from '../actions/index';

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

	componentWillReceiveProps({ cssPath }) {
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
				<webview autosize="on" id="webview" maxWidth="100%" ref="webview" src={this.props.htmlPath}></webview>

				{previewLoadingMask}
			</div>
		);
	}

	renderPreviewLoadingMask() {
		return (
			<div className="preview-box-loading-mask">
				<div className="preview-box-loading-mask-text">
					<div className="spinner">
						<div className="rect1"></div>
						<div className="rect2"></div>
						<div className="rect3"></div>
						<div className="rect4"></div>
						<div className="rect5"></div>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state, ownProps) => {
	let preview = state.get('preview');
	let previewLoading = state.get('previewLoading');
	let selectedComponent = state.get('selectedComponent');

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

export default connect(mapStateToProps, mapDispatchToProps)(PreviewBox);
