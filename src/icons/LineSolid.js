import React from 'react';
import PropTypes from 'prop-types';

import Line from './Line';

const iconClassName = 'feather feather-line-solid';

const LineSolid = ({ size, ...restProps }) => {

  return (
    <Line
      size={size}
      className={iconClassName}
      {...restProps}
    />
  );
};

LineSolid.propTypes = {
  size: PropTypes.number,
};

LineSolid.defaultProps = {
  size: 16,
};

export default LineSolid;
