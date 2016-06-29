import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	SET_THEME: (state, {path}) => {
		return path;
	}
};

export default createReducer('', actionHandlers);
