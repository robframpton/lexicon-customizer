'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRedux = require('react-redux');

var _Button = require('../../components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _variables = require('../../actions/variables');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onClick: function onClick(e) {
			if (confirm('Are you sure you want to reset? This will erase custom variables from your theme\'s _aui_variables.scss file.')) {
				dispatch((0, _variables.resetComponentVariables)());
			}
		}
	};
};

var ResetComponentButton = (0, _reactRedux.connect)(null, mapDispatchToProps)(_Button2.default);

exports.default = ResetComponentButton;