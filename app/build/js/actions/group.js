'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setGroup = setGroup;
function setGroup(group) {
	return {
		group: group,
		type: 'SET_GROUP'
	};
};