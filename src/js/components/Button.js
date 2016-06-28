import React, { PropTypes } from 'react'

const Button = ({ label, onClick }) => {
	return (
		<button
			className="btn btn-default"
			onClick={() => {
				onClick();
			}}
		>
			{label}
		</button>
	);
}

Button.propTypes = {
	label:  PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default Button;