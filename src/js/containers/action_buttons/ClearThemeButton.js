import React from 'react';
import {connect} from 'react-redux';

import Button from '../../components/Button';
import {setTheme} from '../../actions/theme';

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: (e) => {
			dispatch(setTheme(''));
		}
	};
};

const mapStateToProps = (state, ownProps) => {
	return {
		disabled: !state.get('theme')
	}
};

const ClearThemeButton = connect(mapStateToProps, mapDispatchToProps)(Button);

export default ClearThemeButton;
