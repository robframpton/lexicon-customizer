import {connect} from 'react-redux';

import Button from '../../components/Button';
import {createPreviewPopout} from '../../actions/previewPopout';

const mapStateToProps = (state, ownProps) => {
	return {
		disabled: !!state.get('previewPopout')
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: (e) => {
			dispatch(createPreviewPopout());
		}
	}
};

const PopoutPreviewButton = connect(mapStateToProps, mapDispatchToProps)(Button);

export default PopoutPreviewButton;
