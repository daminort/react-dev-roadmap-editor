import React from 'react';
import PropTypes from 'prop-types';

const PageSVG = ({ width, height }) => {

  const style = {
    display         : 'block',
    position        : 'absolute',
    left            : 0,
    top             : 0,
    width           : '100%',
    height          : '100%',
    minWidth        : width,
    minHeight       : height,
    backgroundImage : 'none',
  };

  return (
    <svg style={style}>
      <g transform="translate(0.5,0.5)">
        <rect x="10" y="10" width="120" height="60" fill="#ffffff" stroke="#000000" pointerEvents="all" />
      </g>
    </svg>
  );
};

PageSVG.propTypes = {
  width  : PropTypes.number.isRequired,
  height : PropTypes.number.isRequired,
};

export default PageSVG;
