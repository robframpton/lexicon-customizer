import React, { Component } from 'react';
import { connect } from 'react-redux';

import { renderPreview } from '../actions/index';

const mapStateToProps = (state, ownProps) => {
	const { preview, selectedComponent } = state;

	return {
		preview,
		selectedComponent
	};
};

class PreviewBox extends Component {
	componentDidMount() {
		const { dispatch, selectedComponent } = this.props;

		dispatch(renderPreview(selectedComponent));
	}

	render() {
		return (
			<div className="preview-box">
				<webview autosize="on" maxWidth="100%" ref="webview" src={this.props.preview}></webview>
			</div>
		);
	}
}

export default connect(mapStateToProps)(PreviewBox);
