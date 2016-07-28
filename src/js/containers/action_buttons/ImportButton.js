import {connect} from 'react-redux';
import {remote} from 'electron';

import Button from '../../components/Button';
import {importVariables} from '../../lib/system/import_export';

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: (e) => {
			importVariables(dispatch);
		}
	};
};

const ImportButton = connect(null, mapDispatchToProps)(Button);

export default ImportButton;
