import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import SideMenu from '../components/SideMenu';
import {renderPreview} from '../actions/index';
import {setGroup} from '../actions/group';
import {setSelectedComponent} from '../actions/selectedComponent';

const mapStateToProps = (state, ownProps) => {
	return {
		components: state.get('components'),
		selectedItem: state.get('selectedComponent')
	};
};

const mapDispatchtoProps = (dispatch, ownProps) => {
	return {
		onClick: event => {
			let currentTarget = event.currentTarget;

			let selectedComponent = currentTarget.getAttribute('data-name');

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
