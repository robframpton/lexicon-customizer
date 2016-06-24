import {createReducer} from '../lib/util';

const actionHandlers = {
	'SET_SELECTED_COMPONENT': (state, {component}) => {
		return component;
	}
};

export default createReducer('cards', actionHandlers);
