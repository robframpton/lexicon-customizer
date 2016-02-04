import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
	let themeName = state.theme;

	if (themeName) {
		themeName = themeName.replace(/.*\/(.*)/, '$1');
	}

	return {
		themeName: themeName
	}
}

let ThemeLabel = ({ themeName }) => {
	return (
		<span className="theme-label">Current Theme: {themeName}</span>
	);
};

ThemeLabel = connect(
	mapStateToProps
)(ThemeLabel);

export default ThemeLabel;
