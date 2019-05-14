import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import diagramActions from '../../../redux/diagram/actions';
import { HTML_IDS } from '../../../constants/layout';

const { uploadInput } = HTML_IDS;

const UploadInput = ({ actions }) => {

	return (
		<input
			id={uploadInput}
			type="file"
			accept="application/json"
			defaultValue={null}
			onChange={({ target }) => actions.uploadStart(target.files[0])}
		/>
	);
};

UploadInput.propTypes = {
	actions: PropTypes.shape({
		uploadStart: PropTypes.func.isRequired,
	}).isRequired,
};

const mapActions = (dispatch) => {

	return {
		actions: bindActionCreators({
			uploadStart: diagramActions.uploadStart,
		}, dispatch),
	};
};

const Connected = connect(null, mapActions)(UploadInput);
Connected.defaultProps = UploadInput.defaultProps;

export default Connected;
