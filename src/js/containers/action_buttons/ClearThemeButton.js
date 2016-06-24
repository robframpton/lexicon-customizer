import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button';

let ClearThemeButton = ({ dispatch }) => {
	return (
		<Button
			label="Clear Theme"
			onClick={e => {
				dispatch({
					path: '',
					type: 'SET_THEME'
				});
			}}
		/>
	);
}

ClearThemeButton = connect()(ClearThemeButton);

export default ClearThemeButton;
