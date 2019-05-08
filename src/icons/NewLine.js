import React from 'react';
import PropTypes from 'prop-types';

const svgProps = {
  xmlns   : 'http://www.w3.org/2000/svg',
  viewBox : '0 0 24 24',
  fill    : 'none',
};

const defaultProps = {
  color     : 'currentColor',
  thickness : 3,
  ends      : 'round',
  joins     : 'round',
  className : null,
};

const iconClassName = 'feather feather-curve-new';

const NewLine = ({ size, ...restProps }) => {

  return (
    <svg
      {...svgProps}
      width={size}
      height={size}
      stroke={defaultProps.color}
      strokeWidth={defaultProps.thickness}
      strokeLinecap={defaultProps.ends}
      strokeLinejoin={defaultProps.joins}
      className={iconClassName}
      {...restProps}
    >
      <path d="M 1 23 C 7 7, 17 17, 23 1" />
    </svg>
  );
};

NewLine.propTypes = {
  size: PropTypes.number,
};

NewLine.defaultProps = {
  size: 16,
};

export default NewLine;
