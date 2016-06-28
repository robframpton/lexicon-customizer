import React, {Component} from 'react';
import {connect} from 'react-redux';

import FileDropper from '../components/FileDropper';
import ThemeLabel from '../containers/ThemeLabel';
import {setTheme} from '../actions/index';

class ThemeDropper extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FileDropper onDrop={this.handleDrop.bind(this)}>
				<ThemeLabel />
			</FileDropper>
		);
	}

	handleDrop(files) {
		let file = files[0];

		this.props.dispatch(setTheme(file.path));
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		dispatch
	}
};

export default connect(null, mapDispatchToProps)(ThemeDropper);
