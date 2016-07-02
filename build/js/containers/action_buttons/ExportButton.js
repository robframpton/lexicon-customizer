'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRedux = require('react-redux');

var _Button = require('../../components/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		download: '_variables.scss',
		href: state.get('filePaths').get('customVariables')
	};
};

var ExportButton = (0, _reactRedux.connect)(mapStateToProps)(_Button2.default);

exports.default = ExportButton;