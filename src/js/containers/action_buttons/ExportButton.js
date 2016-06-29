import React from 'react';
import {connect} from 'react-redux';

import Button from '../../components/Button';

let ExportButton = ({customVariablesPath}) => {
	return (
		<Button
			download
			href={customVariablesPath}
			label="Export variables"
		/>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		customVariablesPath: state.get('filePaths').get('customVariables')
	}
};

ExportButton = connect(mapStateToProps)(ExportButton);

export default ExportButton;
