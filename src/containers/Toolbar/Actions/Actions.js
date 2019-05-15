import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToolbarButton from '../../../components/ToolbarButton';
import { Save, Upload, Download, ClearAll } from '../../../icons';

import diagramActions from '../../../redux/diagram/actions';

const Actions = ({ diagramStore, diagramDownload, diagramReset, uploadFileSelect }) => {

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
      <div className="right">
        <ToolbarButton
          id="actionClearAll"
          title="Clear diagram"
          className="last red"
          onClick={() => diagramReset()}
        >
          <ClearAll />
        </ToolbarButton>
      </div>
    </div>
  );
};

Actions.propTypes = {
  diagramStore     : PropTypes.func.isRequired,
  diagramDownload  : PropTypes.func.isRequired,
  diagramReset     : PropTypes.func.isRequired,
  uploadFileSelect : PropTypes.func.isRequired,
};

const mapActions = {
  diagramStore     : diagramActions.diagramStore,
  diagramDownload  : diagramActions.diagramDownload,
  diagramReset     : diagramActions.diagramReset,
  uploadFileSelect : diagramActions.uploadFileSelect,
};

export default connect(null, mapActions)(Actions);
