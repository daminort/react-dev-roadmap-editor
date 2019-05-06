import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@daminort/react-feather-icons';

const NewCircle = ({ size }) => {
  return (
    <Icon
      name="circle"
      size={size}
    />
  );
};

NewCircle.propTypes = {
  size: PropTypes.number,
};

NewCircle.defaultProps = {
  size: 16,
};

export default NewCircle;
