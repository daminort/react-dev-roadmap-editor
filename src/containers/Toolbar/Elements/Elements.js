import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToolbarButton from '../../../components/ToolbarButton';
import { NewBox, NewLine, Trash } from '../../../icons';

import diagramActions from '../../../redux/diagram/actions';
import { selectActiveShapeID } from '../../../redux/app/selectors';

const Elements = ({ activeShapeID, isShapeSelected, shapeRemove }) => {

  const onClickRemove = () => {
    shapeRemove(activeShapeID);
  };

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
      {isShapeSelected && (
        <div className="right">
          <ToolbarButton
            id="removeShape"
            title="Remove diagram item"
            className="last red"
            onClick={onClickRemove}
          >
            <Trash />
          </ToolbarButton>
        </div>
      )}
    </div>
  );
};

Elements.propTypes = {
  activeShapeID   : PropTypes.string.isRequired,
  isShapeSelected : PropTypes.bool.isRequired,
  shapeRemove     : PropTypes.func.isRequired,
};

const mapState = (state) => {
  const activeShapeID = selectActiveShapeID(state);

  return {
    activeShapeID,
    isShapeSelected: Boolean(activeShapeID),
  };
};

const mapActions = {
  shapeRemove: diagramActions.shapeRemove,
};

export default connect(mapState, mapActions)(Elements);
