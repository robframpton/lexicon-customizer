import path from 'path';
import {connect} from 'react-redux';

import Button from '../../components/Button';
import {exportVariables} from '../../lib/system/import_export';

const mapStateToProps = (state, ownProps) => {
	return {
		onClick: () => {
			exportVariables(state.get('lexiconDirs').customDir);
		}
	}
};

const ExportButton = connect(mapStateToProps)(Button);

export default ExportButton;
