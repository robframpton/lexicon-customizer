import {createReducer} from '../lib/util';

const actionHandlers = {
	'SET_VARIABLES': (state, action) => {
		return Object.assign({}, state, action.variables);
	}
};

export default createReducer({}, actionHandlers);
