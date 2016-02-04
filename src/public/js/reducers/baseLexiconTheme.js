const baseLexiconTheme = (state = 'lexiconBase', action) => {
	switch (action.type) {
		case 'SET_BASE_LEXICON_THEME':
			return action.value;
		default:
			return state;
	}
}

export default baseLexiconTheme