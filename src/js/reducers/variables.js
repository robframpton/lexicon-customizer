import {createReducer} from '../lib/redux_util';
import {Map, OrderedMap} from 'immutable';

const actionHandlers = {
	'SET_GROUP_VARIABLES': (state, action) => {
		return state;
	},

	'SET_COMPONENT_VARIABLES': (state, action) => {
		return state;
	},

	'SET_VARIABLE': (state, action) => {
		let {name, value} = action;

		let variable = state.get(name);

		return state.set(name, variable.set('value', value));
	}
};

export default createReducer(OrderedMap(), actionHandlers);
