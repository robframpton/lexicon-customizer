import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';

let ResetButton = ({ dispatch }) => {
	return (
		<Button
			label="Reset"
			onClick={e => {
				dispatch({
					type: 'RESET_VARIABLES'
				});
			}}
		/>
	);
}

ResetButton = connect()(ResetButton);

export default ResetButton
