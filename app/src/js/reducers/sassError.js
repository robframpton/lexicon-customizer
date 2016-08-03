import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	SET_SASS_ERROR: (state, {error}) => {
		return error;
	},

	CLEAR_SASS_ERROR: (state, action) => {
		return null;
	}
};

export default createReducer('', actionHandlers);
