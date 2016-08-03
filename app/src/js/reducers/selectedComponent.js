import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	SET_SELECTED_COMPONENT: (state, {component}) => {
		return component;
	}
};

export default createReducer('alerts', actionHandlers);
