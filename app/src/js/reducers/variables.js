import {Map, OrderedMap} from 'immutable';

import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	OVERWRITE_VARIABLES: (state, {variables}) => {
		if (OrderedMap.isOrderedMap(variables)) {
			return variables;
		}
		else {
			return state;
		}
	},

	SET_VARIABLE: (state, action) => {
		let {name, value} = action;

		let variable = state.get(name);

		return state.set(name, variable.set('value', value));
	},

	SET_VARIABLES: (state, {variables}) => {
		if (!OrderedMap.isOrderedMap(variables)) {
			return state;
		}

		return state.map((variable, key) => {
			if (variables.has(key)) {
				variable = variable.set('value', variables.get(key).get('value'));
			}

			return variable;
		});
	}
};

export default createReducer(OrderedMap(), actionHandlers);
