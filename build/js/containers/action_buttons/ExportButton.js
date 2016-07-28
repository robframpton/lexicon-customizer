'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _reactRedux = require('react-redux');

var _Button = require('../../components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _import_export = require('../../lib/system/import_export');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		onClick: function onClick() {
			(0, _import_export.exportVariables)(state.get('lexiconDirs').customDir);
		}
	};
};

var ExportButton = (0, _reactRedux.connect)(mapStateToProps)(_Button2.default);

exports.default = ExportButton;