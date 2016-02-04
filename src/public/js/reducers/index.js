import { combineReducers } from 'redux'
import baseLexiconTheme from './baseLexiconTheme'
import variables from './variables'
import theme from './theme'

const lexiconCustomizerReducer = combineReducers({
	baseLexiconTheme,
	theme,
	variables
})

export default lexiconCustomizerReducer