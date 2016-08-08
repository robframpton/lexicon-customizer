import {connect} from 'react-redux';

import Button from '../../components/Button';
import {togglePreviewPopout} from '../../actions/previewPopout';

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: (e) => {
			dispatch(togglePreviewPopout());
		}
	}
};

const TogglePopoutPreviewButton = connect(null, mapDispatchToProps)(Button);

export default TogglePopoutPreviewButton;
