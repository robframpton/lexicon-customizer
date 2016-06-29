import {Map} from 'immutable';

import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	SET_COMPONENTS: (state, {components}) => {
		return components;
	}
};

export default createReducer(Map(), actionHandlers);
