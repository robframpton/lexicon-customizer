'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _SideMenu = require('../components/SideMenu');

var _SideMenu2 = _interopRequireDefault(_SideMenu);

var _index = require('../actions/index');

var _group = require('../actions/group');

var _selectedComponent = require('../actions/selectedComponent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		components: state.get('components'),
		selectedItem: state.selectedComponent
	};
};

var mapDispatchtoProps = function mapDispatchtoProps(dispatch, ownProps) {
	return {
		onClick: function onClick(event) {
			var currentTarget = event.currentTarget;

			var selectedComponent = currentTarget.getAttribute('data-name');

			dispatch({
				loading: true,
				type: 'SET_PREVIEW_LOADING'
			});

			dispatch((0, _selectedComponent.setSelectedComponent)(selectedComponent));
			dispatch((0, _index.renderPreview)(selectedComponent));
		}
	};
};

var ComponentSideMenu = (0, _reactRedux.connect)(mapStateToProps, mapDispatchtoProps)(_SideMenu2.default);

exports.default = ComponentSideMenu;