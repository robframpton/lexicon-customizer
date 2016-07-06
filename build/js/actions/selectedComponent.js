'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setSelectedComponent = setSelectedComponent;
function setSelectedComponent(component) {
	return {
		component: component,
		type: 'SET_SELECTED_COMPONENT'
	};
};