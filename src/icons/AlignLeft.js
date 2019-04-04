import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@daminort/react-feather-icons';

const AlignLeft = ({ size }) => {
  return (
    <Icon
      name="alignLeft"
      size={size}
    />
  );
};

AlignLeft.propTypes = {
  size: PropTypes.number,
};

AlignLeft.defaultProps = {
  size: 16,
};

export default AlignLeft;
