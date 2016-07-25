import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	SET_PREVIEW: (state, {preview}) => {
		return preview;
	},

	TOGGLE_DEV_TOOLS: (state) => {
		const {devToolsOpen} = state;

		state.devToolsOpen = !devToolsOpen;

		return Object.assign({}, state);
	}
};

export default createReducer({}, actionHandlers);
