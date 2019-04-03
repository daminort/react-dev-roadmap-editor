import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@daminort/react-feather-icons';

const Trash = ({ size }) => {
  return (
    <Icon
      name="trash2"
      size={size}
    />
  );
};

Trash.propTypes = {
  size: PropTypes.number,
};

Trash.defaultProps = {
  size: 16,
};

export default Trash;
