import React from 'react';
import PropTypes from 'prop-types';

import SizeControlsUtils from '../../utils/SizeControlsUtils';
import { TYPES } from '../../constants/common';
import { SIZE_CONTROLS } from '../../constants/layout';

const availableKeys = ['start', 'end'];

const CurveSizeControls = ({ shape, activeControl }) => {

  const controls = SizeControlsUtils.makeControls(TYPES.curve, shape, activeControl);
  const { colors, sizes, radius, styles, positions } = controls;

  const elements = availableKeys.map(key => {
    return (
      <rect
        key={key}
        id={SIZE_CONTROLS[key]}
        x={positions[key].x}
        y={positions[key].y}
        width={sizes[key]}
        height={sizes[key]}
        fill={colors[key]}
        stroke={colors[key]}
        rx={radius[key]}
        ry={radius[key]}
        style={styles[key]}
        pointerEvents="all"
      />
    );
  });

  return (
    <>
      {elements}
    </>
  );
};

CurveSizeControls.propTypes = {
  activeControl: PropTypes.string.isRequired,
  shape: PropTypes.shape({
    x1 : PropTypes.number,
    y1 : PropTypes.number,
    x2 : PropTypes.number,
    y2 : PropTypes.number,
  }).isRequired,
};

export default CurveSizeControls;
