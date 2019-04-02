import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@daminort/react-feather-icons';

const NewBox = ({ size }) => {
  return (
    <Icon
      name="type"
      size={size}
    />
  );
};

NewBox.propTypes = {
  size: PropTypes.number,
};

NewBox.defaultProps = {
  size: 16,
};

export default NewBox;
