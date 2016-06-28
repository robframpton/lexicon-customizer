import React from 'react';
import {connect} from 'react-redux';
import {remote} from 'electron';

import Button from '../../components/Button';
import {importVariables} from '../../actions/index';

let ImportButton = ({dispatch}) => {
	return (
		<Button
			label="Import variables"
			onClick={e => {
				remote.dialog.showOpenDialog({
					properties: ['openFile']
				}, function(filePaths) {
					if (filePaths && filePaths.length) {
						dispatch(importVariables(filePaths[0]));
					}
				});
			}}
		/>
	);
}

ImportButton = connect()(ImportButton);

export default ImportButton;
