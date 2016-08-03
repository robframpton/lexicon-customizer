import React, {PropTypes} from 'react';

const Radio = ({checked, label, onChange, value}) => {
	return (
		<div className="radio">
			<label>
				<input
					checked={checked}
					onChange={event => {
						onChange();
					}}
					type="radio"
					value={value}
				/>

				{label}
			</label>
		</div>
	);
}

Radio.propTypes = {
	checked: PropTypes.bool,
	label:  PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default Radio;
