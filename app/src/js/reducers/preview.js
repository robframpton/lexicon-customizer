import {createReducer} from '../lib/redux_util';

const actionHandlers = {
	SET_PREVIEW: (state, {preview}) => {
		return preview;
	},

	SET_PREVIEW_PATHS: (state, {preview}) => {
		return Object.assign({}, state, preview);
	},

	TOGGLE_DEV_TOOLS: (state) => {
		const {devToolsOpen, force} = state;

		state.devToolsOpen = !devToolsOpen;

		if (force !== undefined) {
			state.devToolsOpen = force;
		}

		return Object.assign({}, state);
	}
};

export default createReducer({}, actionHandlers);
