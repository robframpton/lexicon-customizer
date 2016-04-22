import { combineReducers } from 'redux';
import baseLexiconTheme from './baseLexiconTheme';
import bootstrapComponents from './bootstrapComponents';
import components from './components';
import group from './group';
import modifiedVariables from './modifiedVariables';
import preview from './preview';
import previewLoading from './previewLoading';
import selectedComponent from './selectedComponent';
import sourceVariables from './sourceVariables';
import theme from './theme';

const lexiconCustomizerReducer = combineReducers({
	baseLexiconTheme,
	bootstrapComponents,
	components,
	group,
	modifiedVariables,
	preview,
	previewLoading,
	selectedComponent,
	sourceVariables,
	theme
});

export default lexiconCustomizerReducer;
