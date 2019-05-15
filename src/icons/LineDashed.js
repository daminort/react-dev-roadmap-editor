import React from 'react';
import PropTypes from 'prop-types';

import Line from './Line';

const iconClassName = 'feather feather-line-dashed';

const LineDashed = ({ size, ...restProps }) => {

  return (
    <Line
      dashed
      size={size}
      className={iconClassName}
      {...restProps}
    />
  );
};

LineDashed.propTypes = {
  size: PropTypes.number,
};

LineDashed.defaultProps = {
  size: 16,
};

export default LineDashed;
