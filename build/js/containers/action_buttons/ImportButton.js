'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRedux = require('react-redux');

var _electron = require('electron');

var _Button = require('../../components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _import_export = require('../../lib/system/import_export');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onClick: function onClick(e) {
			(0, _import_export.importVariables)(dispatch);
		}
	};
};

var ImportButton = (0, _reactRedux.connect)(null, mapDispatchToProps)(_Button2.default);

exports.default = ImportButton;