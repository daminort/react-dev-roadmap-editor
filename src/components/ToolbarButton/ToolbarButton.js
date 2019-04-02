import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './ToolbarButton.style';

const ToolbarButton = ({ id, title, className, children, onClick }) => {

  return (
    <Wrapper
      title={title}
      className={className}
      onClick={() => onClick(id)}
    >
      {children}
    </Wrapper>
  );
};

ToolbarButton.propTypes = {
  id      : PropTypes.PropTypes.string.isRequired,
  children: PropTypes.oneOfType(
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ).isRequired,
  title     : PropTypes.string,
  className : PropTypes.string,
  onClick   : PropTypes.func,
};

ToolbarButton.defaultProps = {
  title     : '',
  className : '',
  onClick   : () => {},
};

export default ToolbarButton;
