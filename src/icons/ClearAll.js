import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@daminort/react-feather-icons';

const ClearAll = ({ size }) => {
  return (
    <Icon
      name="fileX"
      size={size}
    />
  );
};

ClearAll.propTypes = {
  size: PropTypes.number,
};

ClearAll.defaultProps = {
  size: 16,
};

export default ClearAll;
