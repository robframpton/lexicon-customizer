import {OrderedMap} from 'immutable';

import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	OVERWRITE_SOURCE_VARIABLES: (state, {variables}) => {
		if (OrderedMap.isOrderedMap(variables)) {
			return variables;
		}
		else {
			return state;
		}
	}
};

export default createReducer(OrderedMap(), actionHandlers);
