import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@daminort/react-feather-icons';

const Download = ({ size }) => {
  return (
    <Icon
      name="download"
      size={size}
    />
  );
};

Download.propTypes = {
  size: PropTypes.number,
};

Download.defaultProps = {
  size: 16,
};

export default Download;
