import React, { Component } from 'react';
import { connect } from 'react-redux';

import FileDropper from '../components/FileDropper';
import { setTheme } from '../actions/index';

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onDrop: function(event) {
			var file = event.dataTransfer.files[0];

			dispatch(setTheme(file.path));
		}
	};
};

export default connect(null, mapDispatchToProps)(FileDropper);
