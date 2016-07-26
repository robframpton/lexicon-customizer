'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _electron = require('electron');

var _edit = require('./menu/edit');

var _edit2 = _interopRequireDefault(_edit);

var _help = require('./menu/help');

var _help2 = _interopRequireDefault(_help);

var _lexicon_customizer = require('./menu/lexicon_customizer');

var _lexicon_customizer2 = _interopRequireDefault(_lexicon_customizer);

var _preview = require('./menu/preview');

var _preview2 = _interopRequireDefault(_preview);

var _variables = require('./menu/variables');

var _variables2 = _interopRequireDefault(_variables);

var _view = require('./menu/view');

var _view2 = _interopRequireDefault(_view);

var _window = require('./menu/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = _electron.remote.Menu;
var MenuItem = _electron.remote.MenuItem;


function initMenu(store) {
	var template = [];

	if (process.platform === 'darwin') {
		template.push((0, _lexicon_customizer2.default)(store));
	}

	var menu = Menu.buildFromTemplate(template.concat([(0, _edit2.default)(store), (0, _view2.default)(store), (0, _window2.default)(store), (0, _variables2.default)(store), (0, _preview2.default)(store), (0, _help2.default)(store)]));

	Menu.setApplicationMenu(menu);
}

exports.default = initMenu;