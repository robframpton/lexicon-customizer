'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Radio = require('../components/Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _baseLexiconTheme = require('../actions/baseLexiconTheme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		checked: ownProps.value === state.get('baseLexiconTheme')
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onChange: function onChange() {
			dispatch((0, _baseLexiconTheme.setBaseLexiconTheme)(ownProps.value));
		}
	};
};

var ThemeRadio = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Radio2.default);

exports.default = ThemeRadio;