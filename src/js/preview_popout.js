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
		const parentWindow = BrowserWindow.fromId(1);

		ipcRenderer.on('preview-data', this.handlePreviewData.bind(this));

		parentWindow.send('request-preview-data');
	}

	render() {
		return (
			<PreviewBox {...this.state} />
		);
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
