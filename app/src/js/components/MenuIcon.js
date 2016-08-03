import _ from 'lodash';
import React, {Component} from 'react';

class MenuIcon extends Component {
	render() {
		return (
			<div className="menu-icon">
				{_.times(3, (index) => {
					const className = 'menu-icon-dot menu-icon-dot-' + index;

					return (<span className={className} key={index}></span>);
				})}
			</div>
		)
	}
}

export default MenuIcon;