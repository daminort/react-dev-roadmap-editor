import React from 'react';
import PropTypes from 'prop-types';

import SizeControlsUtils from '../../utils/SizeControlsUtils';
import { SIZE_CONTROLS } from '../../constants/layout';

const BoxSizeControls = ({ shape, activeControl }) => {

  const controls = SizeControlsUtils.makeControls(shape, activeControl);
  const { colors, sizes, radius, styles, positions } = controls;

  const elements = Object.keys(SIZE_CONTROLS).map(key => {
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

BoxSizeControls.propTypes = {
  activeControl: PropTypes.string.isRequired,
  shape: PropTypes.shape({
    x      : PropTypes.number,
    y      : PropTypes.number,
    width  : PropTypes.number,
    height : PropTypes.number,
  }).isRequired,
};

export default BoxSizeControls;
