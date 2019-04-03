import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Wrapper } from './ToolbarRow.style';

const ToolbarRow = ({ title, noBorder, children }) => {

  const className = classnames({
    noBorder,
  });

  return (
    <Wrapper className={className}>
      {title && <div className="title">{title}</div>}
      <div className="content">
        {children}
      </div>
    </Wrapper>
  );
};

ToolbarRow.propTypes = {
  title   : PropTypes.string,
  noBorder: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

ToolbarRow.defaultProps = {
  title    : null,
  noBorder : false,
  children : null,
};

export default ToolbarRow;
