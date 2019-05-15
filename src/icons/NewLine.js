import React from 'react';
import PropTypes from 'prop-types';
import { svgProps, commonProps } from './props';

const iconClassName = 'feather feather-curve-new';

const NewLine = ({ size, ...restProps }) => {

  return (
    <svg
      {...svgProps}
      {...commonProps}
      width={size}
      height={size}
      strokeWidth={3}
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
