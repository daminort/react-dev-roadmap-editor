import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DiagramUtils from '../../utils/DiagramUtils';
import { THEME } from '../../constants/theme';
import { selectShape, selectShapeContent } from '../../redux/diagram/selectors';
import { selectActiveShapeID } from '../../redux/app/selectors';

const colorInert  = THEME.bg.black;
const colorActive = THEME.bg.blue;

const Box = (props) => {
  const {
    id,
    shape,
    shapeContent,
    isSelected,
  } = props;

  const { x, y, width, height, bg } = shape;
  const { title } = shapeContent;

  const radius      = DiagramUtils.calculateBorderRadius(width, height);
  const textX       = x + width / 2;
  const textY       = y + height / 2;
  const strokeColor = isSelected ? colorActive : colorInert;
  const style = {
    cursor: isSelected ? 'pointer' : 'default',
  };

  return (
    <g transform="translate(0.5, 0.5)" id={id}>
      <rect
        id={id}
        x={x}
        y={y}
        width={width}
        height={height}
        fill={bg}
        stroke={strokeColor}
        rx={radius}
        ry={radius}
        style={style}
        pointerEvents="all"
      />
      <text
        id={id}
        x={textX}
        y={textY}
        style={style}
        alignmentBaseline="middle"
        textAnchor="middle"
      >
        {title}
      </text>
    </g>
  );
};

Box.propTypes = {
  id      : PropTypes.string.isRequired,
  onClick : PropTypes.func.isRequired,
  shape: PropTypes.shape({
    x        : PropTypes.number,
    y        : PropTypes.number,
    width    : PropTypes.number,
    height   : PropTypes.number,
    bg       : PropTypes.string,
    align    : PropTypes.string,
    noBorder : PropTypes.bool,
  }).isRequired,

  shapeContent: PropTypes.shape({
    title : PropTypes.string,
    url   : PropTypes.string,
    info  : PropTypes.string,
  }).isRequired,

  isSelected : PropTypes.bool.isRequired,
  //activeControl     : PropTypes.string.isRequired,
  //dndComplete       : PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  const { id } = props;
  const shape         = selectShape(id)(state);
  const shapeContent  = selectShapeContent(id)(state);
  const activeShapeID = selectActiveShapeID(state);

  return {
    shape,
    shapeContent,
    isSelected: (id === activeShapeID),
  };
};

const Connected = connect(mapState)(Box);
Connected.defaultProps = Box.defaultProps;

export default Connected;
