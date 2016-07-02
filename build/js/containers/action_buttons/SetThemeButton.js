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

var SetThemeButton = function SetThemeButton(_ref) {
	var dispatch = _ref.dispatch;

	return React.createElement(_Button2.default, {
		label: 'Set Theme',
		onClick: function onClick(e) {
			_electron.remote.dialog.showOpenDialog({
				properties: ['openDirectory']
			}, function (filePaths) {
				if (filePaths && filePaths.length) {
					dispatch((0, _index.setTheme)(filePaths[0]));
				}
			});
		}
	});
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		label: 'Set theme',
		onClick: function onClick(e) {
			_electron.remote.dialog.showOpenDialog({
				properties: ['openDirectory']
			}, function (filePaths) {
				if (filePaths && filePaths.length) {
					dispatch((0, _index.setTheme)(filePaths[0]));
				}
			});
		}
	};
};

SetThemeButton = (0, _reactRedux.connect)()(SetThemeButton);

exports.default = SetThemeButton;