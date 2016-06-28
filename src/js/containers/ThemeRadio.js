import React from 'react';
import {connect} from 'react-redux';

import Radio from '../components/Radio';
import {setBaseLexiconTheme} from '../actions/index';

const mapStateToProps = (state, ownProps) => {
	return {
		checked: ownProps.value === state.get('baseLexiconTheme')
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: () => {
			dispatch(setBaseLexiconTheme(ownProps.value));
		}
	}
};

const ThemeRadio = connect(
	mapStateToProps,
	mapDispatchToProps
)(Radio);

export default ThemeRadio;
