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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var components = state.get('components');

	return {
		groups: [{
			id: 'lexicon',
			items: components.get('lexicon'),
			title: 'Lexicon'
		}, {
			id: 'bootstrap',
			items: components.get('bootstrap'),
			title: 'Bootstrap'
		}],
		selectedItem: state.selectedComponent
	};
};

var mapDispatchtoProps = function mapDispatchtoProps(dispatch, ownProps) {
	return {
		onClick: function onClick(event) {
			var currentTarget = event.currentTarget;

			var groupId = currentTarget.getAttribute('data-group-id');
			var selectedComponent = currentTarget.getAttribute('data-name');

			dispatch({
				loading: true,
				type: 'SET_PREVIEW_LOADING'
			});
			dispatch((0, _index.setGroup)(groupId));
			dispatch((0, _index.setSelectedComponent)(selectedComponent));
			dispatch((0, _index.renderPreview)(selectedComponent));
		}
	};
};

var ComponentSideMenu = (0, _reactRedux.connect)(mapStateToProps, mapDispatchtoProps)(_SideMenu2.default);

exports.default = ComponentSideMenu;