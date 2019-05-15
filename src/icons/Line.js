import React from 'react';
import PropTypes from 'prop-types';
import { svgProps, commonProps } from './props';

const lineProps = {
  x1: 1,
  y1: 1,
  x2: 23,
  y2: 23,
  stroke: commonProps.stroke,
};

const Line = ({ size, dotted, dashed, ...restProps }) => {

  let strokeDasharray = 0;
  if (dotted || dashed) {
    strokeDasharray = dotted ? 4 : 6;
  }

  const strokeWidth = dotted ? 1 : 3;

  return (
    <svg
      {...svgProps}
      {...commonProps}
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      {...restProps}
    >
      <line {...lineProps} strokeDasharray={strokeDasharray} />
    </svg>
  );
};

Line.propTypes = {
  size   : PropTypes.number,
  dotted : PropTypes.bool,
  dashed : PropTypes.bool,
};

Line.defaultProps = {
  size   : 16,
  dotted : false,
  dashed : false,
};

export default Line;
