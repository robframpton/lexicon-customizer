'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _PreviewBox = require('../components/PreviewBox');

var _PreviewBox2 = _interopRequireDefault(_PreviewBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var _state$get = state.get('preview');

	var cssPath = _state$get.cssPath;
	var htmlPath = _state$get.htmlPath;


	return {
		cssPath: cssPath,
		htmlPath: htmlPath
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(_PreviewBox2.default);