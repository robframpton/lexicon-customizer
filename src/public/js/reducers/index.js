import { combineReducers } from 'redux';
import baseLexiconTheme from './baseLexiconTheme';
import components from './components';
import preview from './preview';
import selectedComponent from './selectedComponent';
import theme from './theme';
import variables from './variables';

const lexiconCustomizerReducer = combineReducers({
	baseLexiconTheme,
	components,
	preview,
	selectedComponent,
	theme,
	variables
});

export default lexiconCustomizerReducer;