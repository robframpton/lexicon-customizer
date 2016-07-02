'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRedux = require('react-redux');

var _electron = require('electron');

var _Button = require('../../components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _index = require('../../actions/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onClick: function onClick(e) {
			_electron.remote.dialog.showOpenDialog({
				properties: ['openFile']
			}, function (filePaths) {
				if (filePaths && filePaths.length) {
					dispatch((0, _index.importVariables)(filePaths[0]));
				}
			});
		}
	};
};

var ImportButton = (0, _reactRedux.connect)(null, mapDispatchToProps)(_Button2.default);

exports.default = ImportButton;