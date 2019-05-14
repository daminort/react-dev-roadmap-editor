import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Wrapper } from './ToolbarButton.style';

const ToolbarButton = ({ id, title, className, disabled, children, onClick }) => {

  const wrapperClass = classnames(className, {
    disabled,
  });

  const onClickHandler = disabled
    ? () => {}
    : onClick;

  return (
    <Wrapper
      title={title}
      className={wrapperClass}
      onClick={() => onClickHandler(id)}
    >
      {children}
    </Wrapper>
  );
};

ToolbarButton.propTypes = {
  id      : PropTypes.PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  title     : PropTypes.string,
  className : PropTypes.string,
  disabled  : PropTypes.bool,
  onClick   : PropTypes.func,
};

ToolbarButton.defaultProps = {
  title     : '',
  className : null,
  disabled  : false,
  children  : null,
  onClick   : () => {},
};

export default ToolbarButton;
