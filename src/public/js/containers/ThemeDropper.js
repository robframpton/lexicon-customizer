import React, { Component } from 'react';

import FileDropper from '../containers/FileDropper'

class ThemeDropper extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FileDropper onDrop={this.handleDrop.bind(this)}>
				Drop your theme here!
			</FileDropper>
		);
	}

	handleDrop(event) {
		event.preventDefault();
		event.stopPropagation();

		var file = event.dataTransfer.files[0];

		dispatch(setTheme(file.path));
	}
}

export default ThemeDropper;