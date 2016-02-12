import React, { Component, PropTypes } from 'react';

class FileDropper extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hovering: false
		};
	}

	componentDidMount() {
		var instance = this;

		document.addEventListener('dragenter', function(event) {
			event.preventDefault();

			instance.setState({
				hovering: true
			});

			return false;
		}, false);

		document.addEventListener('dragleave', function(event) {
			if (event.target.className.indexOf('file-dropper-hover-mask') != -1) {
				instance.setState({
					hovering: false
				});
			}
		}, false);

		document.addEventListener('dragover',function(event){
			event.preventDefault();

			return false;
		}, false);

		document.addEventListener('drop', function(event) {
			event.preventDefault();

			if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
				instance.props.onDrop(event);
			}

			instance.setState({
				hovering: false
			});

			return false;
		}, false);
	}

	render() {
		if (!this.state.hovering) {
			return false;
		}
		else {
			return (
				<div className="file-dropper-hover-mask">
					<span>{this.props.children}</span>
				</div>
			);
		}
	}
}

FileDropper.propTypes = {
	onDrop: PropTypes.func.isRequired
};

export default FileDropper;
