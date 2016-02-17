const group = (state = 'lexicon', action) => {
	switch (action.type) {
		case 'SET_GROUP':
			return action.group;
		default:
			return state;
	}
};

export default group;
