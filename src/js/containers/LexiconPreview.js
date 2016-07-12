import React, {Component} from 'react';
import {connect} from 'react-redux';

import PreviewBox from '../components/PreviewBox';

const mapStateToProps = (state, ownProps) => {
	const {cssPath, htmlPath} = state.get('preview');

	return {
		cssPath,
		htmlPath
	};
};

export default connect(mapStateToProps)(PreviewBox);
