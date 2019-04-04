import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToolbarButton from '../../../components/ToolbarButton';
import { NewBox, NewLine, Trash } from '../../../icons';

import DiagramUtils from '../../../utils/DiagramUtils';
import diagramActions from '../../../redux/diagram/actions';
import { selectActiveShapeID } from '../../../redux/app/selectors';

const Elements = ({ activeShapeID, isShapeSelected, shapeSet, shapeContentSet, shapeRemove }) => {

  const onClickRemove = () => {
    shapeRemove(activeShapeID);
  };

  const onClickNewBox = () => {
    const newShape = DiagramUtils.createBox();
    const { id } = newShape;

    const shapeContent = DiagramUtils.createShapeContent(id);

    shapeContentSet(id, shapeContent);
    shapeSet(id, newShape);
  };

  return (
    <div className="left-right">
      <div className="left">
        <ToolbarButton
          id="newBox"
          title="Add new Box"
          onClick={onClickNewBox}
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
  shapeSet        : PropTypes.func.isRequired,
  shapeContentSet : PropTypes.func.isRequired,
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
  shapeSet        : diagramActions.shapeSet,
  shapeContentSet : diagramActions.shapeContentSet,
  shapeRemove     : diagramActions.shapeRemove,
};

export default connect(mapState, mapActions)(Elements);
