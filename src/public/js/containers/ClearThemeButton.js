import React from 'react';
import { connect } from 'react-redux';

import Button from '../components/Button';
import { setBaseTheme } from '../actions/index'

let ClearThemeButton = ({ dispatch }) => {
	return (
		<Button
			label="Clear Theme"
			onClick={e => {
				dispatch(setBaseTheme(''))
			}}
		/>
	);
}

ClearThemeButton = connect()(ClearThemeButton);

export default ClearThemeButton
