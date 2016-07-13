import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	SET_COLOR_VARIABLE_NAME: (state, {name}) => {
		return name;
	}
};

export default createReducer('$alert-default-bg', actionHandlers);
