import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { SIZE_CONTROLS } from '../../constants/layout';

const { top, bottom, left, right } = SIZE_CONTROLS;

const SizeControls = ({ activeControl }) => {

  const classTop    = classnames('size-control', 'top',    { active : activeControl === top });
  const classBottom = classnames('size-control', 'bottom', { active : activeControl === bottom });
  const classLeft   = classnames('size-control', 'left',   { active : activeControl === left });
  const classRight  = classnames('size-control', 'right',  { active : activeControl === right });

  return (
    <>
      <div id={top} className={classTop} />
      <div id={bottom} className={classBottom} />
      <div id={left} className={classLeft} />
      <div id={right} className={classRight} />
    </>
  );
};

SizeControls.propTypes = {
  activeControl: PropTypes.string.isRequired,
};

export default SizeControls;
