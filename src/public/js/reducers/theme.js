const theme = (state = '', action) => {
	switch (action.type) {
		case 'SET_THEME':
			return action.path;
		default:
			return state;
	}
}

export default theme
