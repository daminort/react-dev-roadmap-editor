import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import appActions from '../../redux/app/actions';
import diagramActions from '../../redux/diagram/actions';
import { selectBoxes, selectCurves, selectShape } from '../../redux/diagram/selectors';
import {
  selectActiveShapeID,
  selectIsResize,
  selectResizeData,
  selectIsCreate,
} from '../../redux/app/selectors';
import { SIZE_CONTROLS } from '../../constants/layout';

import Box from '../Box';
import MathUtils from '../../utils/MathUtils';
import DOMUtils from '../../utils/DOMUtils';

const staticPageStyle = {
  display         : 'block',
  position        : 'absolute',
  left            : 0,
  top             : 0,
  width           : '100%',
  height          : '100%',
  backgroundImage : 'none',
};

const excludedIDs  = ['page'];
const sizeControls = Object.values(SIZE_CONTROLS);

const isSizeContol = (id) => {
  return sizeControls.includes(id);
};

const PageSVG = (props) => {
  const {
    width,
    height,
    boxes,
    activeShapeID,
    activeShape,
    isResize,
    isCreate,
    resizeControlID,
    activeShapeIDSet,
    resizeDataSet,
    resizeComplete,
    dndComplete,
    createComplete,
    shapeUpdate,
  } = props;

  const [isDragging, setDraggingMode] = useState(false);

  // Events ---------------------------------------------------------------------------------------
  const onClick = (event) => {
    const { target } = event;
    const { id } = target;

    // 1. Exit from creating mode
    if (isCreate) {
      if (id !== 'page') {
        return;
      }
      const { clientX, clientY } = event;
      const position = DOMUtils.calculateLayoutClickPosition(clientX, clientY);

      createComplete(position);
      return;
    }

    // 2. Exit from resize mode
    if (isResize) {
      resizeComplete();
      return;
    }

    // 3. Enter to resize mode
    if (isSizeContol(id) && !isResize) {
      resizeDataSet({
        shapeID    : activeShapeID,
        controlID  : id,
        initX      : activeShape.x,
        initY      : activeShape.y,
        initWidth  : activeShape.width,
        initHeight : activeShape.height,
      });
      return;
    }

    // 4. Exit from select mode
    if (excludedIDs.includes(id)) {
      activeShapeIDSet('');
      return;
    }

    // 5. Enter to select mode
    activeShapeIDSet(id);
  };

  const onMouseMove = (event) => {
    if (!activeShape) {
      return;
    }

    // 1. Resize
    if (isResize) {
      const { movementX, movementY } = event;
      const newPosition = MathUtils.calculateResize(activeShape, movementX, movementY, resizeControlID);

      shapeUpdate(activeShapeID, newPosition);
      return;
    }

    // 2. Moving
    if (event.buttons && event.buttons === 1) {
      if (!isDragging) {
        setDraggingMode(true);
      }
      const { movementX, movementY } = event;
      const newPosition = MathUtils.calculateMoving(activeShape, movementX, movementY);

      shapeUpdate(activeShapeID, newPosition);
    }
  };

  const onMouseUp = () => {
    if (!isDragging) {
      return;
    }

    setDraggingMode(false);
    dndComplete(activeShape);
  };

  // Renders --------------------------------------------------------------------------------------
  const style = {
    ...staticPageStyle,
    minWidth  : width,
    minHeight : height,
    cursor    : isCreate ? 'crosshair' : 'default',
  };

  const renderBoxes = boxes.map(box => (
    <Box
      key={box.id}
      id={box.id}
    />
  ));

  return (
    <svg
      id="page"
      style={style}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {renderBoxes}
    </svg>
  );
};

PageSVG.propTypes = {
  boxes            : PropTypes.array.isRequired,
  curves           : PropTypes.array.isRequired,
  width            : PropTypes.number.isRequired,
  height           : PropTypes.number.isRequired,

  activeShapeIDSet : PropTypes.func.isRequired,
  resizeDataSet    : PropTypes.func.isRequired,
  resizeComplete   : PropTypes.func.isRequired,
  dndComplete      : PropTypes.func.isRequired,
  createComplete   : PropTypes.func.isRequired,
  shapeUpdate      : PropTypes.func.isRequired,

  activeShapeID    : PropTypes.string,
  resizeControlID  : PropTypes.string,
  isResize         : PropTypes.bool,
  isCreate         : PropTypes.bool,

  activeShape: PropTypes.shape({
    x      : PropTypes.number,
    y      : PropTypes.number,
    width  : PropTypes.number,
    height : PropTypes.number,
  }),
};

PageSVG.defaultProps = {
  activeShapeID   : '',
  resizeControlID : '',
  isResize        : false,
  isCreate        : false,
  activeShape     : {},
};

const mapState = (state) => {
  const boxes         = selectBoxes(state);
  const curves        = selectCurves(state);
  const activeShapeID = selectActiveShapeID(state);
  const resizeData    = selectResizeData(state);

  return {
    boxes,
    curves,
    activeShapeID,
    activeShape     : selectShape(activeShapeID)(state),
    isResize        : selectIsResize(state),
    resizeControlID : resizeData.controlID,
    isCreate        : selectIsCreate(state),
  };
};

const mapActions = {
  activeShapeIDSet : appActions.activeShapeIDSet,
  resizeDataSet    : appActions.resizeDataSet,
  resizeComplete   : appActions.resizeComplete,
  dndComplete      : appActions.dndComplete,
  createComplete   : appActions.createComplete,
  shapeUpdate      : diagramActions.shapeUpdate,
};

const Connected = connect(mapState, mapActions)(PageSVG);
Connected.defaultProps = PageSVG.defaultProps;

export default Connected;
