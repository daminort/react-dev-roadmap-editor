import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@daminort/react-feather-icons';

const AlignCenter = ({ size }) => {
  return (
    <Icon
      name="alignCenter"
      size={size}
    />
  );
};

AlignCenter.propTypes = {
  size: PropTypes.number,
};

AlignCenter.defaultProps = {
  size: 16,
};

export default AlignCenter;
