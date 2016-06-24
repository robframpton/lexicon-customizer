import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';

class FileDropper extends Component {
	render() {
		return (
			<Dropzone activeClassName="file-dropper-hover" className="file-dropper" multiple={false} onDrop={this.props.onDrop}>
					<span>{this.props.children}</span>
			</Dropzone>
		);
	}
}

FileDropper.propTypes = {
	onDrop: PropTypes.func.isRequired
}

export default FileDropper;