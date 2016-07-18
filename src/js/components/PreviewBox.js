import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {renderPreview} from '../actions/index';

class PreviewBox extends Component {
	constructor(props) {
		super(props);

		let state = {};

		if (!props.htmlPath) {
			state.previewLoading = true;
		}

		this.state = state;
	}

	componentDidUpdate() {
		const {webview} = this.refs;

		if (webview && !this._webviewLoadListener) {
			webview.addEventListener('did-stop-loading', this.handleDidStopLoading.bind(this));

			this._webviewLoadListener = true;
		}
	}

	componentWillReceiveProps({cssPath, htmlPath}) {
		this._setWebviewCssPath(cssPath);

		if (htmlPath !== this.props.htmlPath) {
			this.setState({
				previewLoading: true
			});
		}
	}

	handleDidStopLoading() {
		const {cssPath, didStopLoading} = this.props;

		this._setWebviewCssPath(cssPath);

		this.setState({
			previewLoading: false
		});

		if (didStopLoading) {
			didStopLoading();
		}
	}

	render() {
		const {htmlPath} = this.props;
		const {previewLoading} = this.state;

		const previewLoadingMask = previewLoading ? this.renderPreviewLoadingMask() : '';
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
			<webview
				autosize="on"
				id="webview"
				maxWidth="100%"
				ref="webview"
				src={this.props.htmlPath}
			></webview>
		);
	}

	_setWebviewCssPath(cssPath) {
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
};

PreviewBox.propTypes = {
	cssPath: PropTypes.string,
	didStopLoading: PropTypes.func,
	htmlPath:  PropTypes.string
};

export default PreviewBox;
