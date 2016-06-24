import React from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';

import Button from '../../components/Button';

let ExportButton = ({ dispatch }) => {
	return (
		<Button
			label="Export variables"
			onClick={e => {
				console.log('TODO: Export variables');
			}}
		/>
	);
}

ExportButton = connect()(ExportButton);

export default ExportButton;
