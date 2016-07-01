import React from 'react';
import {connect} from 'react-redux';

import Button from '../../components/Button';
import {setTheme} from '../../actions/index';

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: (e) => {
			dispatch(setTheme(''));
		}
	};
};

const ClearThemeButton = connect(null, mapDispatchToProps)(Button);

export default ClearThemeButton;
