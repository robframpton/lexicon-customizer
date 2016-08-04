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

		this.selfClose = false;
	}

	componentDidMount() {
		const instance = this;

		const toggleDevTools = this.toggleDevTools.bind(this);

		setTimeout(() => {
			const webview = instance._getWebviewDOMNode();

			webview.addEventListener('dom-ready', () => {
				const {devToolsOpen} = instance.props;

				toggleDevTools(devToolsOpen);
			});
		}, 0)
	}

	componentDidUpdate() {
		const webview = this._getWebviewDOMNode();

		if (webview && !this._hasListeners) {
			webview.addEventListener('devtools-closed', this.handleDevToolsClosed.bind(this));
			webview.addEventListener('devtools-opened', this.handleDevToolsOpened.bind(this));
			webview.addEventListener('did-stop-loading', this.handleDidStopLoading.bind(this));

			this._hasListeners = true;
		}
	}

	componentWillReceiveProps({cssPath, htmlPath, devToolsOpen}) {
		this._setWebviewCssPath(cssPath);

		if (htmlPath !== this.props.htmlPath) {
			this.setState({
				previewLoading: true
			});
		}

		if (devToolsOpen !== this.props.devToolsOpen) {
			this.toggleDevTools(devToolsOpen);
		}
	}

	handleDevToolsClosed(event) {
		const {devToolsClosed} = this.props;

		if (devToolsClosed && !this.selfClose) {
			devToolsClosed();
		}

		this.selfClose = false;
	}

	handleDevToolsOpened() {
		this.selfClose = false;
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
				src={this.props.htmlPath}
			></webview>
		);
	}

	toggleDevTools(show) {
		const webview = this._getWebviewDOMNode();

		if (webview) {
			if (show) {
				webview.openDevTools();
			}
			else {
				this.selfClose = true;

				webview.closeDevTools();
			}
		}
	}

	_getWebviewDOMNode() {
		return document.getElementById('webview');
	}

	_setWebviewCssPath(cssPath) {
		let scriptString = `
			var lexiconStylesheetLink = document.getElementById('lexiconStylesheetLink');
			var lexiconStylesheetLinkHREF = lexiconStylesheetLink.getAttribute('href');

			if (lexiconStylesheetLinkHREF != '${cssPath}') {
				lexiconStylesheetLink.setAttribute('href', '${cssPath}')
			};
		`;

		const webview = this._getWebviewDOMNode();

		if (cssPath && webview && webview.executeJavaScript) {
			webview.executeJavaScript(scriptString);
		}
	}
};

PreviewBox.propTypes = {
	cssPath: PropTypes.string,
	didStopLoading: PropTypes.func,
	htmlPath:  PropTypes.string,
	devToolsOpen: PropTypes.bool
};

export default PreviewBox;
