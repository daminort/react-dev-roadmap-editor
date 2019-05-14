import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@daminort/react-feather-icons';

const Upload = ({ size }) => {
  return (
    <Icon
      name="upload"
      size={size}
    />
  );
};

Upload.propTypes = {
  size: PropTypes.number,
};

Upload.defaultProps = {
  size: 16,
};

export default Upload;
