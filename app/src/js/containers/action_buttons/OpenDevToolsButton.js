import React from 'react';
import {connect} from 'react-redux';

import Button from '../../components/Button';
import {toggleDevTools} from '../../actions/preview';

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: (e) => {
			dispatch(toggleDevTools());
		}
	};
};

const ClearThemeButton = connect(null, mapDispatchToProps)(Button);

export default ClearThemeButton;
