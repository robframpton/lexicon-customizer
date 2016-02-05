import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SideMenu from '../components/SideMenu';
import { renderPreview } from '../actions/index';

const mapStateToProps = (state, ownProps) => {
	return {
		items: state.components || {},
		selectedItem: state.selectedComponent
	};
};

const mapDispatchtoProps = (dispatch, ownProps) => {
	return {
		onClick: event => {
			let currentTarget = event.currentTarget;
			let selectedComponent = currentTarget.getAttribute('data-name');

			dispatch({
				component: selectedComponent,
				type: 'SET_SELECTED_COMPONENT'
			});

			dispatch(renderPreview(selectedComponent));
		}
	};
};

const ComponentSideMenu = connect(
	mapStateToProps,
	mapDispatchtoProps
)(SideMenu);

export default ComponentSideMenu;
