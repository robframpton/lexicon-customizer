import React from 'react';
import {connect} from 'react-redux';

import Button from '../components/Button';

let OpenDevToolsButton = (props) => {
	return (
		<Button
			onClick={e => {
				let webview = document.getElementById('webview');

				if (webview) {
					webview.openDevTools();
				}
			}}

			{...props}
		/>
	);
}

export default OpenDevToolsButton;
