import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToolbarButton from '../../../components/ToolbarButton';
import { Save, Upload, Download } from '../../../icons';

import diagramActions from '../../../redux/diagram/actions';

const Actions = ({ diagramStore, diagramUpload, diagramDownload, uploadFileSelect }) => {

  return (
    <div className="left-right">
      <div className="left">
        <ToolbarButton
          id="actionSave"
          title="Save Diagram"
          onClick={() => diagramStore()}
        >
          <Save />
        </ToolbarButton>
        <ToolbarButton
          id="actionDownload"
          title="Download Diagram"
          onClick={() => diagramDownload()}
        >
          <Download />
        </ToolbarButton>
        <ToolbarButton
          id="actionUpload"
          title="Upload Diagram"
          onClick={() => uploadFileSelect()}
        >
          <Upload />
        </ToolbarButton>
      </div>
    </div>
  );
};

Actions.propTypes = {
  diagramStore     : PropTypes.func.isRequired,
  diagramUpload    : PropTypes.func.isRequired,
  diagramDownload  : PropTypes.func.isRequired,
  uploadFileSelect : PropTypes.func.isRequired,
};

const mapActions = {
  diagramStore     : diagramActions.diagramStore,
  diagramUpload    : diagramActions.diagramUpload,
  diagramDownload  : diagramActions.diagramDownload,
  uploadFileSelect : diagramActions.uploadFileSelect,
};

export default connect(null, mapActions)(Actions);
