import React, {Component} from 'react';
import {connect} from 'react-redux';

import {renderPreview} from '../actions/index';

class PreviewBox extends Component {
	componentDidMount() {
		const {dispatch, selectedComponent} = this.props;

		dispatch(renderPreview(selectedComponent));
	}

	componentWillReceiveProps({preview}) {
		const {cssPath} = preview;

		let scriptString = `
			var lexiconStylesheetLink = document.getElementById('lexiconStylesheetLink');
			var lexiconStylesheetLinkHREF = lexiconStylesheetLink.getAttribute('href');

			if (lexiconStylesheetLinkHREF != '${cssPath}') {
				lexiconStylesheetLink.setAttribute('href', '${cssPath}')
			};
		`;

		if (cssPath && this.refs.webview && this.refs.webview.executeJavaScript) {
			this.refs.webview.executeJavaScript(scriptString);
		}
	}

	render() {
		const htmlPath = this.props.preview.htmlPath;

		const previewLoadingMask = this.props.previewLoading ? this.renderPreviewLoadingMask() : '';

		const webview = htmlPath ? this.renderWebview() : '';

		return (
			<div className="preview-box">
				{webview}

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

	renderWebview() {
		return (
			<webview autosize="on" id="webview" maxWidth="100%" ref="webview" src={this.props.preview.htmlPath}></webview>
		);
	}
};

const mapStateToProps = (state, ownProps) => {
	let preview = state.get('preview');
	let previewLoading = state.get('previewLoading');
	let selectedComponent = state.get('selectedComponent');

	return {
		preview,
		previewLoading,
		selectedComponent
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		dispatch
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewBox);
