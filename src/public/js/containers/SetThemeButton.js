import React from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';

import Button from '../components/Button';
import { setTheme } from '../actions/index';

let SetThemeButton = ({ dispatch }) => {
	return (
		<Button
			label="Set Theme"
			onClick={e => {
				remote.dialog.showOpenDialog({
					properties: ['openDirectory']
				}, function(filePaths) {
					if (filePaths && filePaths.length) {
						dispatch(setTheme(filePaths[0]));
					}
				});
			}}
		/>
	);
}

SetThemeButton = connect()(SetThemeButton);

export default SetThemeButton;
