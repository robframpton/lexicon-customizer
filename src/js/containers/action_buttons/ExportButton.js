import {connect} from 'react-redux';

import Button from '../../components/Button';

const mapStateToProps = (state, ownProps) => {
	return {
		download: '_variables.scss',
		href: state.get('filePaths').get('customVariables')
	}
};

const ExportButton = connect(mapStateToProps)(Button);

export default ExportButton;
