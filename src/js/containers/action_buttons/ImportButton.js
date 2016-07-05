import {connect} from 'react-redux';
import {remote} from 'electron';

import Button from '../../components/Button';
import {importVariables} from '../../actions/variables';

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: (e) => {
			remote.dialog.showOpenDialog({
				properties: ['openFile']
			}, function(filePaths) {
				if (filePaths && filePaths.length) {
					dispatch(importVariables(filePaths[0]));
				}
			});
		}
	};
};

const ImportButton = connect(null, mapDispatchToProps)(Button);

export default ImportButton;
