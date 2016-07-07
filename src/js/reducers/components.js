import {List} from 'immutable';

import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	SET_COMPONENTS: (state, {components}) => {
		return components;
	}
};

export default createReducer(List(), actionHandlers);
