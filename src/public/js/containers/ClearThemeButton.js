import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';

let ClearThemeButton = ({ dispatch }) => {
	return (
		<Button
			label="Clear Theme"
			onClick={e => {
				dispatch({
					theme: '',
					type: 'SET_BASE_THEME'
				});
			}}
		/>
	);
}

ClearThemeButton = connect()(ClearThemeButton);

export default ClearThemeButton
