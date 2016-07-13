import React, {Component} from 'react';
import {connect} from 'react-redux';

import ColorPickerPanel from '../components/ColorPickerPanel';
import {setColorVariableName} from '../actions/colorVariableName';
import {setVariable} from '../actions/variables';

const mapStateToProps = (state, ownProps) => {
	const colorVariableName = state.get('colorVariableName');
	const variables = state.get('variables');

	let value;

	if (variables.has(colorVariableName)) {
		value = variables.get(colorVariableName).get('value');
	}

	return {
		name: colorVariableName,
		value,
		variables
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: (value, name) => {
			dispatch(setVariable(name, value));
		},
		onClose: event => {
			dispatch(setColorVariableName(null));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerPanel);
