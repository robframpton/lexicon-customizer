import {createReducer} from '../lib/redux_util';
import {List} from 'immutable';

const actionHandlers = {
	ADD_SASS_ERROR: (state, {err}) => {
		return state.push(err);
	},

	CLEAR_SASS_ERRORS: (state, action) => {
		return List();
	}
};

export default createReducer(List(), actionHandlers);
