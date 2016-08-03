'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setComponents = setComponents;
function setComponents(components) {
	return {
		components: components,
		type: 'SET_COMPONENTS'
	};
};