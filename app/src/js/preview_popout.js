'use strict';

import {remote, ipcRenderer} from 'electron';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const {BrowserWindow} = remote;

import PreviewBox from '../js/components/PreviewBox';

class LexiconPopoutPreview extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		const parentWindow = remote.getCurrentWindow().getParentWindow();

		ipcRenderer.on('preview-data', this.handlePreviewData.bind(this));

		parentWindow.send('request-preview-data');

		this.parentWindow = parentWindow;
	}

	render() {
		return (
			<PreviewBox
				devToolsClosed={this.handleDevToolsClosed.bind(this)}
				{...this.state}
			/>
		);
	}

	handleDevToolsClosed(event) {
		this.parentWindow.send('devtools-open', false);
	}

	handlePreviewData(event, data) {
		this.setState(data);
	}
}

const render = () => {
	ReactDOM.render(
		<LexiconPopoutPreview />,
		document.getElementById('main')
	);
};

render();
