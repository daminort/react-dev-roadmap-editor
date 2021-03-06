import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { THEME } from '../../constants/theme';
import { selectShape } from '../../redux/diagram/selectors';
import { selectActiveShapeID, selectResizeData } from '../../redux/app/selectors';

import { CurveSizeControls } from '../../components';

const colorLine     = THEME.bg.black;
const colorControls = THEME.sizeControls.inactive;

const Curve = (props) => {
  const {
    id,
    shape,
    isSelected,
    activeControl,
  } = props;

  const { x1, y1, x2, y2, cpx1, cpy1, cpx2, cpy2, dashed } = shape;

  const style = { cursor: 'pointer' };
  const color = isSelected ? colorControls : colorLine;
  const thickness = isSelected ? 2 : 1;

  const path = `M ${x1} ${y1} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x2} ${y2}`;

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
        <CurveSizeControls
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
  const resize        = selectResizeData(state);
  const activeShapeID = selectActiveShapeID(state);

  return {
    shape,
    isSelected: (id === activeShapeID),
    activeControl: resize.controlID,
  };
};

const Connected = connect(mapState)(Curve);
Connected.defaultProps = Curve.defaultProps;

export default Connected;
