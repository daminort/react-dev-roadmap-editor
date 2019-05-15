import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@daminort/react-feather-icons';

const TextSize = ({ size }) => {
  return (
    <Icon
      name="type"
      size={size}
    />
  );
};

TextSize.propTypes = {
  size: PropTypes.number,
};

TextSize.defaultProps = {
  size: 16,
};

export default TextSize;
