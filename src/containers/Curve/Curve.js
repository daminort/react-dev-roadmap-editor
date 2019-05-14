import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DiagramUtils from '../../utils/DiagramUtils';
import { THEME } from '../../constants/theme';
import { selectShape } from '../../redux/diagram/selectors';
import { selectActiveShapeID, /*selectResizeData*/ } from '../../redux/app/selectors';

const colorLine     = THEME.bg.black;
const colorControls = THEME.sizeControls.inactive;

const Curve = (props) => {
  const {
    id,
    shape,
    isSelected,
    // activeControl,
  } = props;

  const { x1, y1, x2, y2, dashed, direction } = shape;

  const style = { cursor: 'pointer' };
  const color = isSelected ? colorControls : colorLine;
  const thickness = isSelected ? 2 : 1;

  const bezier = DiagramUtils.calculateBezier(x1, y1, x2, y2, direction);
  const { cpx1, cpy1, cpx2, cpy2 } = bezier;
  const path = `M ${x1} ${y1} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x2} ${y2}`;

  const controlCoords = [
    { x: x1, y: y1 },
    { x: x2, y: y2 },
  ];

  const controls = controlCoords.map(item => (
    <circle
      key={`control:${item.x}-${item.y}`}
      cx={item.x}
      cy={item.y}
      r={2}
      stroke={colorControls}
      fill={colorControls}
    />
  ));

  return (
    <g transform="translate(0, 0)" id={id}>
      <path
        id={id}
        d={path}
        fill="transparent"
        stroke={color}
        strokeDasharray={dashed ? 3 : 0}
        strokeWidth={thickness}
        style={style}
        pointerEvents="all"
      />
      {isSelected && (
        <>
          {controls}
        </>
      )}
    </g>
  );
};

Curve.propTypes = {
  id   : PropTypes.string.isRequired,
  shape: PropTypes.shape({
    x1        : PropTypes.number.isRequired,
    y1        : PropTypes.number.isRequired,
    x2        : PropTypes.number.isRequired,
    y2        : PropTypes.number.isRequired,
    dashed    : PropTypes.bool,
    direction : PropTypes.string,
  }).isRequired,

  isSelected    : PropTypes.bool.isRequired,
  activeControl : PropTypes.string.isRequired,
};

const mapState = (state, props) => {
  const { id } = props;
  const shape         = selectShape(id)(state);
  // const resize        = selectResizeData(state);
  const activeShapeID = selectActiveShapeID(state);

  return {
    shape,
    isSelected: (id === activeShapeID),
    activeControl: '', // resize.controlID,
  };
};

const Connected = connect(mapState)(Curve);
Connected.defaultProps = Curve.defaultProps;

export default Connected;
