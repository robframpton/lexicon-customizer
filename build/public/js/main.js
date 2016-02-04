'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _he = require('he');

var _he2 = _interopRequireDefault(_he);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAutosuggest = require('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _componentScraper = require('../../../lib/component-scraper');

var _componentScraper2 = _interopRequireDefault(_componentScraper);

var _sass = require('../../../lib/sass');

var _sass2 = _interopRequireDefault(_sass);

var _theme = require('../../../lib/theme');

var _theme2 = _interopRequireDefault(_theme);

var _user_config = require('../../../lib/user_config');

var _user_config2 = _interopRequireDefault(_user_config);

var _index = require('../js/reducers/index');

var _index2 = _interopRequireDefault(_index);

var _LexiconCustomizer = require('../js/components/LexiconCustomizer');

var _LexiconCustomizer2 = _interopRequireDefault(_LexiconCustomizer);

var _redux = require('redux');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// <Extract to different file>

var store = (0, _redux.createStore)(_index2.default);
// </Extract to different file>

var userConfig = new _user_config2.default();

var lexiconBaseVariables = _componentScraper2.default.mapLexiconVariables();
store.dispatch({
	type: 'SET_VARIABLES',
	variables: lexiconBaseVariables
});

var customVariables = _componentScraper2.default.getVariablesFromFile(_path2.default.join(process.cwd(), 'lexicon/_custom_variables.scss'));
store.dispatch({
	type: 'SET_VARIABLES',
	variables: customVariables
});

var render = function render() {
	_reactDom2.default.render(_react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2.default.createElement(_LexiconCustomizer2.default, {
			baseVariables: lexiconBaseVariables,
			variables: store.getState().variables
		})
	), document.getElementById('main'));
};

render();

store.subscribe(render);