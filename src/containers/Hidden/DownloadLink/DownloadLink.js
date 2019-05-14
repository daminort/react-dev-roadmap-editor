import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import diagramActions from '../../../redux/diagram/actions';
import { HTML_IDS } from '../../../constants/layout';
import { selectDownloadData } from '../../../redux/diagram/selectors';

const { downloadLink } = HTML_IDS;

const DownloadLink = ({ downloadData, actions }) => {
	const jsonData = JSON.stringify(downloadData);
	const blobData = new Blob([jsonData], { type: 'application/json' });
	const dataURL  = window.URL.createObjectURL(blobData);

	useEffect(() => {
		if (downloadData) {
			actions.downloadStart();
		}
	}, [downloadData]);

	return (
		<a
			id={downloadLink}
			href={dataURL}
			download="diagram.json"
		>
			Download Diagram
		</a>
	);
};

DownloadLink.propTypes = {
	downloadData: PropTypes.object,
	actions: PropTypes.shape({
		downloadStart: PropTypes.func.isRequired,
	}).isRequired,
};

DownloadLink.defaultProps = {
	downloadData: null,
};

const mapState = (state) => {

	return {
		downloadData: selectDownloadData(state),
	};
};

const mapActions = (dispatch) => {

	return {
		actions: bindActionCreators({
			downloadStart: diagramActions.downloadStart,
		}, dispatch),
	};
};

const Connected = connect(mapState, mapActions)(DownloadLink);
Connected.defaultProps = DownloadLink.defaultProps;

export default Connected;
