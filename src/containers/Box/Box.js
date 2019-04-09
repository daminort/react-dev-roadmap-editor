import React from 'react';
import PropTypes from 'prop-types';

import DiagramUtils from '../../utils/DiagramUtils';
import { THEME } from '../../constants/theme';

const strokeColor = THEME.bg.black;

const Box = (props) => {
  const {
    id,
    shape,
    shapeContent,
  } = props;

  const { x, y, width, height, bg } = shape;
  const { title } = shapeContent;

  const radius = DiagramUtils.calculateBorderRadius(width, height);
  const textX  = x + width / 2;
  const textY  = y + height / 2;

  return (
    <g transform="translate(0.5,0.5)" id={id}>
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
        pointerEvents="all"
      />
      <text x={textX} y={textY} alignmentBaseline="middle" textAnchor="middle">
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

Box.defaultProps = {

};

export default Box;
