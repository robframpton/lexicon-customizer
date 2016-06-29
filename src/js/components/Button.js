import React, {PropTypes} from 'react';

const Button = ({href, label, onClick, ...other}) => {
	if (href) {
		return (
			<a
				{...other}
				className="btn btn-default"
				href={href}
			>
				{label}
			</a>
		);
	}
	else {
		return (
			<button
				{...other}
				className="btn btn-default"
				onClick={onClick}
			>
				{label}
			</button>
		);
	}
};

Button.propTypes = {
	href: PropTypes.string,
	label:  PropTypes.string.isRequired,
	onClick: PropTypes.func
};

export default Button;
