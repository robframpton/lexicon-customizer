import {connect} from 'react-redux';

import Button from '../../components/Button';
import {resetVariables} from '../../actions/variables';

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: (e) => {
			dispatch(resetVariables());
		}
	}
};

const ResetButton = connect(null, mapDispatchToProps)(Button);

export default ResetButton;
