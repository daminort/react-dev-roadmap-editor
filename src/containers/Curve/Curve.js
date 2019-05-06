import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DiagramUtils from '../../utils/DiagramUtils';
import { THEME } from '../../constants/theme';
// import { selectShape, selectShapeContent } from '../../redux/diagram/selectors';
// import { selectActiveShapeID, selectResizeData } from '../../redux/app/selectors';

import SizeControls from '../../components/SizeControls';

const colorInert  = THEME.bg.black;
const colorActive = THEME.bg.blue;

const Curve = (props) => {
  const {
    id,
    shape,
    isSelected,
    activeControl,
  } = props;

  const { startX, startY, endX, endY, dashed } = shape;

  const strokeColor = isSelected ? colorActive : colorInert;
  const style = {
    cursor: isSelected ? 'pointer' : 'default',
  };
  const bezier = DiagramUtils.calculateBezier(startX, startY, endX, endY);
  const { x1, y1, x2, y2, cpx1, cpy1, cpx2, cpy2 } = bezier;
  const path = `M ${x1} ${y1} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x2} ${y2}`;

  return (
    <g transform="translate(0, 0)" id={id}>
      <path
        id={id}
        d={path}
        fill="transparent"
        stroke={strokeColor}
        strokeDasharray={dashed ? 3 : 0}
        style={style}
        pointerEvents="all"
      />
      {isSelected && (
        <SizeControls
          shape={shape}
          activeControl={activeControl}
        />
      )}
    </g>
  );
};

Curve.propTypes = {
  id   : PropTypes.string.isRequired,
  shape: PropTypes.shape({
    startX : PropTypes.number.isRequired,
    startY : PropTypes.number.isRequired,
    endX   : PropTypes.number.isRequired,
    endY   : PropTypes.number.isRequired,
    dashed : PropTypes.bool,
  }).isRequired,

  isSelected    : PropTypes.bool.isRequired,
  activeControl : PropTypes.string.isRequired,
};

const mapState = (/*state, props*/) => {
  // const { id } = props;
  // const shape         = selectShape(id)(state);
  // const shapeContent  = selectShapeContent(id)(state);
  // const resize        = selectResizeData(state);
  // const activeShapeID = selectActiveShapeID(state);

  return {
    isSelected: false, // (id === activeShapeID),
    activeControl: '', // resize.controlID,
  };
};

const Connected = connect(mapState)(Curve);
Connected.defaultProps = Curve.defaultProps;

export default Connected;
