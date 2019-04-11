import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import appActions from '../../redux/app/actions';
import diagramActions from '../../redux/diagram/actions';
import { selectBoxes, selectCurves, selectShape } from '../../redux/diagram/selectors';
import { selectActiveShapeID, selectIsResize, selectResizeData } from '../../redux/app/selectors';
import { SIZE_CONTROLS } from '../../constants/layout';

import Box from '../Box';
import MathUtils from '../../utils/MathUtils';

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
    resizeControlID,
    activeShapeIDSet,
    resizeDataSet,
    resizeComplete,
    shapeUpdate,
  } = props;

  const style = {
    ...staticPageStyle,
    minWidth  : width,
    minHeight : height,
  };

  const renderBoxes = boxes.map(box => (
    <Box
      key={box.id}
      id={box.id}
    />
  ));

  const onClick = (event) => {
    const { target } = event;
    const { id } = target;

    // 1. Exit from resize mode
    if (isResize) {
      resizeComplete();
      return;
    }

    // 2. Enter to resize mode
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

    // 3. Exit from select mode
    if (excludedIDs.includes(id)) {
      activeShapeIDSet('');
      return;
    }

    // 4. Enter to select mode
    activeShapeIDSet(id);
  };

  const onMouseMove = (event) => {
    if (!activeShape || !isResize) {
      return;
    }
    const { movementX, movementY } = event;
    const newPosition = MathUtils.calculateResize(activeShape, movementX, movementY, resizeControlID);

    shapeUpdate(activeShapeID, newPosition);
  };

  return (
    <svg
      id="page"
      style={style}
      onClick={onClick}
      onMouseMove={onMouseMove}
    >
      {renderBoxes}
    </svg>
  );
};

PageSVG.propTypes = {
  boxes            : PropTypes.array.isRequired,
  curves           : PropTypes.array.isRequired,
  activeShapeIDSet : PropTypes.func.isRequired,
  resizeDataSet    : PropTypes.func.isRequired,
  resizeComplete   : PropTypes.func.isRequired,
  shapeUpdate      : PropTypes.func.isRequired,

  activeShapeID    : PropTypes.string,
  resizeControlID  : PropTypes.string,
  isResize         : PropTypes.bool,

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
  };
};

const mapActions = {
  activeShapeIDSet : appActions.activeShapeIDSet,
  resizeDataSet    : appActions.resizeDataSet,
  resizeComplete   : appActions.resizeComplete,
  shapeUpdate      : diagramActions.shapeUpdate,
};

const Connected = connect(mapState, mapActions)(PageSVG);
Connected.defaultProps = PageSVG.defaultProps;

export default Connected;
