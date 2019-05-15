import React from 'react';
import PropTypes from 'prop-types';

import Line from './Line';

const iconClassName = 'feather feather-line-dotted';

const LineDotted = ({ size, ...restProps }) => {

  return (
    <Line
      dotted
      size={size}
      className={iconClassName}
      {...restProps}
    />
  );
};

LineDotted.propTypes = {
  size: PropTypes.number,
};

LineDotted.defaultProps = {
  size: 16,
};

export default LineDotted;
