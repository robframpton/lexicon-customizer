import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { resetVariables } from '../actions/index';

let ResetButton = ({ dispatch }) => {
	return (
		<Button
			label="Reset"
			onClick={e => {
				dispatch(resetVariables());
			}}
		/>
	);
}

ResetButton = connect()(ResetButton);

export default ResetButton
