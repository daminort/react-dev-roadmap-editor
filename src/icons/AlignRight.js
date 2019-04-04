import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@daminort/react-feather-icons';

const AlignRight = ({ size }) => {
  return (
    <Icon
      name="alignRight"
      size={size}
    />
  );
};

AlignRight.propTypes = {
  size: PropTypes.number,
};

AlignRight.defaultProps = {
  size: 16,
};

export default AlignRight;
