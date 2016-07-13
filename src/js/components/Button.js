import React, {PropTypes} from 'react';

import Icon from '../components/Icon';

const Button = ({children, href, icon, onClick, ...other}) => {
	let className = 'btn btn-default';

	if (icon) {
		className += ' btn-icon';

		icon = (
			<Icon icon={icon} />
		);
	}
	else {
		icon = '';
	}

	if (href) {
		return (
			<a
				{...other}
				className={className}
				href={href}
			>
				{icon}

				{children}
			</a>
		);
	}
	else {
		return (
			<button
				{...other}
				className={className}
				onClick={onClick}
			>
				{icon}

				{children}
			</button>
		);
	}
};

Button.propTypes = {
	href: PropTypes.string,
	onClick: PropTypes.func
};

export default Button;
