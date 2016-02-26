import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SideMenu from '../components/SideMenu';
import { setGroup, renderPreview, setSelectedComponent } from '../actions/index';

const mapStateToProps = (state, ownProps) => {
	return {
		groups: [
			{
				id: 'lexicon',
				items: state.components || {},
				title: 'Lexicon'
			},
			{
				id: 'bootstrap',
				items: state.bootstrapComponents || [],
				title: 'Bootstrap'
			}
		],
		selectedItem: state.selectedComponent
	};
};

const mapDispatchtoProps = (dispatch, ownProps) => {
	return {
		onClick: event => {
			let currentTarget = event.currentTarget;

			let groupId = currentTarget.getAttribute('data-group-id');
			let selectedComponent = currentTarget.getAttribute('data-name');

			dispatch({
				loading: true,
				type: 'SET_PREVIEW_LOADING'
			});
			dispatch(setGroup(groupId));
			dispatch(setSelectedComponent(selectedComponent));
			dispatch(renderPreview(selectedComponent));
		}
	};
};

const ComponentSideMenu = connect(
	mapStateToProps,
	mapDispatchtoProps
)(SideMenu);

export default ComponentSideMenu;
