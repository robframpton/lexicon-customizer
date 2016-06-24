import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	'SET_VARIABLES': (state, action) => {
		return Object.assign({}, state, action.variables);
	}
};

export default createReducer({}, actionHandlers);
