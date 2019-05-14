import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@daminort/react-feather-icons';

const Save = ({ size }) => {
  return (
    <Icon
      name="save"
      size={size}
    />
  );
};

Save.propTypes = {
  size: PropTypes.number,
};

Save.defaultProps = {
  size: 16,
};

export default Save;
