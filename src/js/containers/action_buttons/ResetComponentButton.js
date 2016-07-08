import {connect} from 'react-redux';

import Button from '../../components/Button';
import {resetComponentVariables} from '../../actions/variables';

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: (e) => {
			if (confirm('Are you sure you want to reset? This will erase custom variables from your theme\'s _aui_variables.scss file.')) {
				dispatch(resetComponentVariables());
			}
		}
	}
};

const ResetComponentButton = connect(null, mapDispatchToProps)(Button);

export default ResetComponentButton;
