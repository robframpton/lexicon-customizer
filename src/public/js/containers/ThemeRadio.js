import React from 'react';
import { connect } from 'react-redux';
import Radio from '../components/Radio';

const mapStateToProps = (state, ownProps) => {
	return {
		checked: ownProps.value === state.baseLexiconTheme
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: () => {
			dispatch({
				type: 'SET_BASE_LEXICON_THEME',
				value: ownProps.value
			});
		}
	}
}

const ThemeRadio = connect(
	mapStateToProps,
	mapDispatchToProps
)(Radio)

export default ThemeRadio
