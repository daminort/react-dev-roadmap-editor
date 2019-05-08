import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToolbarButton from '../../../components/ToolbarButton';
import { NewBox, NewCircle, NewLine, Trash } from '../../../icons';
import { TYPES } from '../../../constants/common';

import appActions from '../../../redux/app/actions';
import diagramActions from '../../../redux/diagram/actions';
import { selectActiveShapeID } from '../../../redux/app/selectors';
import { selectShape } from '../../../redux/diagram/selectors';

const Elements = (props) => {
  const {
    activeShapeID,
    isShapeSelected,
    // isBox,
    // isCircle,
    isCurve,
    createDataSet,
    activeShapeIDSet,
    shapeRemove,
  } = props;

  const onClickRemove = () => {
    shapeRemove(activeShapeID);
  };

  const onClickCreate = (shapeType) => {
    createDataSet({ shapeType });
    if (shapeType !== TYPES.curve) {
      activeShapeIDSet('');
    }
  };

  return (
    <div className="left-right">
      <div className="left">
        <ToolbarButton
          id="newBox"
          title="Add new Box"
          onClick={() => onClickCreate(TYPES.box)}
        >
          <NewBox />
        </ToolbarButton>
        <ToolbarButton
          id="newCurve"
          title="Concat selected shape with another one"
          disabled={!isShapeSelected || isCurve}
          onClick={() => onClickCreate(TYPES.curve)}
        >
          <NewLine />
        </ToolbarButton>
        <ToolbarButton
          id="newCircle"
          title="Add new Circle"
          onClick={() => onClickCreate(TYPES.circle)}
        >
          <NewCircle />
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
  activeShapeID    : PropTypes.string.isRequired,
  isShapeSelected  : PropTypes.bool.isRequired,
  isBox            : PropTypes.bool.isRequired,
  isCircle         : PropTypes.bool.isRequired,
  isCurve          : PropTypes.bool.isRequired,
  createDataSet    : PropTypes.func.isRequired,
  activeShapeIDSet : PropTypes.func.isRequired,
  shapeRemove      : PropTypes.func.isRequired,
};

const mapState = (state) => {
  const activeShapeID   = selectActiveShapeID(state);
  const activeShape     = selectShape(activeShapeID)(state) || null;
  const activeShapeType = (activeShape && activeShape.type);

  return {
    activeShapeID,
    isShapeSelected : Boolean(activeShapeID),
    isBox           : (activeShapeType === TYPES.box),
    isCircle        : (activeShapeType === TYPES.circle),
    isCurve         : (activeShapeType === TYPES.curve),
  };
};

const mapActions = {
  createDataSet    : appActions.createDataSet,
  activeShapeIDSet : appActions.activeShapeIDSet,
  shapeRemove      : diagramActions.shapeRemove,
};

export default connect(mapState, mapActions)(Elements);
