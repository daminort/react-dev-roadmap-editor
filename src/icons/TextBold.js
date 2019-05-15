import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@daminort/react-feather-icons';

const TextBold = ({ size }) => {
  return (
    <Icon
      name="bold"
      size={size}
    />
  );
};

TextBold.propTypes = {
  size: PropTypes.number,
};

TextBold.defaultProps = {
  size: 16,
};

export default TextBold;
