import React, { Component, PropTypes } from 'react';

class FileDropper extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div
				className="file-dropper"
				onDragEnd={this.props.onDrop}
			>
				<span>{this.props.children}</span>
			</div>
		);
	}
}

FileDropper.propTypes = {
	onDrop: PropTypes.func.isRequired
}

export default FileDropper;