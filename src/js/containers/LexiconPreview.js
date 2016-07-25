import React, {Component} from 'react';
import {connect} from 'react-redux';

import PreviewBox from '../components/PreviewBox';
import {toggleDevTools} from '../actions/preview';

const mapStateToProps = (state, ownProps) => {
	const {cssPath, htmlPath, devToolsOpen} = state.get('preview');

	return {
		cssPath,
		htmlPath,
		devToolsOpen
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		devToolsClosed: () => {
			dispatch(toggleDevTools(false));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewBox);
