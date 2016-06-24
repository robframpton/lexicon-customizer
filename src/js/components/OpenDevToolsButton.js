import React from 'react';
import { connect } from 'react-redux';

import Button from '../components/Button';

let OpenDevToolsButton = (props) => {
	return (
		<Button
			label="Open DevTools"
			onClick={e => {
				let webview = document.getElementById('webview');

				if (webview) {
					webview.openDevTools();
				}
			}}
		/>
	);
}

export default OpenDevToolsButton;
