import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Wrapper } from './ToolbarRow.style';

const ToolbarRow = ({ noBorder, children }) => {

  const className = classnames({
    noBorder,
  });

  return (
    <Wrapper className={className}>
      {children}
    </Wrapper>
  );
};

ToolbarRow.propTypes = {
  noBorder: PropTypes.bool,
  children: PropTypes.oneOfType(
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ),
};

ToolbarRow.defaultProps = {
  noBorder: false,
  children: null,
};

export default ToolbarRow;
