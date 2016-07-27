import {connect} from 'react-redux';

import Button from '../../components/Button';
import {resetComponentVariables} from '../../actions/variables';

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: (e) => {
			dispatch(resetComponentVariables());
		}
	}
};

const ResetComponentButton = connect(null, mapDispatchToProps)(Button);

export default ResetComponentButton;
