import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import { resetVariables } from '../../actions/index';

let ResetButton = ({ dispatch }) => {
	return (
		<Button
			label="Reset"
			onClick={e => {
				if (confirm('Are you sure you want to reset? This will erase custom variables from your theme\'s _aui_variables.scss file.')) {
					dispatch(resetVariables());
				}
			}}
		/>
	);
};

export default connect()(ResetButton);
