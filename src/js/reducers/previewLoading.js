import {createReducer} from '../lib/util';

const actionHandlers = {
	'SET_PREVIEW_LOADING': (state, {loading}) => {
		return loading;
	}
};

export default createReducer(false, actionHandlers);
