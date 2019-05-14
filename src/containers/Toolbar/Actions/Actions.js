import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToolbarButton from '../../../components/ToolbarButton';
import { Save } from '../../../icons';

import diagramActions from '../../../redux/diagram/actions';

const Actions = ({ diagramStore }) => {

  return (
    <div className="left-right">
      <div className="left">
        <ToolbarButton
          id="actionSave"
          title="Save Diagrame"
          onClick={() => diagramStore()}
        >
          <Save />
        </ToolbarButton>
      </div>
    </div>
  );
};

Actions.propTypes = {
  diagramStore : PropTypes.func.isRequired,
};

const mapActions = {
  diagramStore: diagramActions.diagramStore,
};

export default connect(null, mapActions)(Actions);
