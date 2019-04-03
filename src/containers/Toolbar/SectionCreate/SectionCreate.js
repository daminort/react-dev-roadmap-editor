import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToolbarButton from '../../../components/ToolbarButton';
import { NewBox, NewLine, Trash } from '../../../icons';

import { selectActiveItemID } from '../../../redux/app/selectors';

const SectionCreate = ({ isItemSelected }) => {

  return (
    <div className="left-right">
      <div className="left">
        <ToolbarButton
          id="newBox"
          title="Add new Box"
        >
          <NewBox />
        </ToolbarButton>
        <ToolbarButton
          id="newCurve"
          title="Add new Line"
        >
          <NewLine />
        </ToolbarButton>
      </div>
      {isItemSelected && (
        <div className="right">
          <ToolbarButton
            id="removeShape"
            title="Remove diagram item"
            className="last red"
          >
            <Trash />
          </ToolbarButton>
        </div>
      )}
    </div>
  );
};

SectionCreate.propTypes = {
  //activeItemID   : PropTypes.string.isRequired,
  isItemSelected : PropTypes.bool.isRequired,
};

const mapState = (state) => {
  const activeItemID = selectActiveItemID(state);

  return {
    activeItemID,
    isItemSelected: Boolean(activeItemID),
  };
};

export default connect(mapState)(SectionCreate);
