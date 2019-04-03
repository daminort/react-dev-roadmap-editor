import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@daminort/react-feather-icons';

const NewLine = ({ size }) => {
  return (
    <Icon
      name="shuffle"
      size={size}
    />
  );
};

NewLine.propTypes = {
  size: PropTypes.number,
};

NewLine.defaultProps = {
  size: 16,
};

export default NewLine;
