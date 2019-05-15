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

const Line = ({ size, dashed, ...restProps }) => {

  const strokeDasharray = dashed ? 6 : 0;

  return (
    <svg
      {...svgProps}
      {...commonProps}
      width={size}
      height={size}
      strokeWidth={3}
      {...restProps}
    >
      <line {...lineProps} strokeDasharray={strokeDasharray} />
    </svg>
  );
};

Line.propTypes = {
  size   : PropTypes.number,
  dashed : PropTypes.bool,
};

Line.defaultProps = {
  size   : 16,
  dashed : false,
};

export default Line;
