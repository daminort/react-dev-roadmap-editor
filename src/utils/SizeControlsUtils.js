import { SIZE_CONTROLS } from '../constants/layout';
import { THEME } from '../constants/theme';
import { invert } from './lodash';

const { sizeControls } = THEME;
const ivertedControls = invert(SIZE_CONTROLS);

class SizeControlsUtils {

  createColors = () => ({
    top    : sizeControls.inactive,
    bottom : sizeControls.inactive,
    left   : sizeControls.inactive,
    right  : sizeControls.inactive,
  });

  createSizes = () => ({
    top    : 4,
    bottom : 4,
    left   : 4,
    right  : 4,
  });

  createRadius = () => ({
    top    : 0,
    bottom : 0,
    left   : 0,
    right  : 0,
  });

  createStyles = () => ({
    top    : { cursor: 'ns-resize' },
    bottom : { cursor: 'ns-resize' },
    left   : { cursor: 'ew-resize' },
    right  : { cursor: 'ew-resize' },
  });

  createPosition = (shape, sizes) => {
    const { x, y, width, height } = shape;
    const { top, bottom, left, right } = sizes;

    const topX    = x + (width / 2) - (top / 2);
    const topY    = y - (top / 2);
    const bottomX = x + (width / 2) - (bottom / 2);
    const bottomY = y + height - (bottom / 2);
    const leftX   = x - (left / 2);
    const leftY   = y + (height / 2) - (left / 2);
    const rightX  = x + width - (right / 2);
    const rightY  = y + (height / 2) - (right / 2);

    return {
      top    : { x: topX,    y: topY },
      bottom : { x: bottomX, y: bottomY },
      left   : { x: leftX,   y: leftY },
      right  : { x: rightX,  y: rightY },
    };
  }

  detectActiveKey = (activeControl = '') => {
    return ivertedControls[activeControl];
  }

  makeControls = (shape, activeControl = '') => {
    const colors    = this.createColors();
    const sizes     = this.createSizes();
    const radius    = this.createRadius();
    const styles    = this.createStyles();
    const activeKey = this.detectActiveKey(activeControl);

    if (activeKey) {
      colors[activeKey] = sizeControls.active;
      sizes[activeKey]  = 8;
      radius[activeKey] = 1.5;
    }

    const positions = this.createPosition(shape, sizes);

    return {
      colors,
      sizes,
      radius,
      styles,
      positions,
    };
  }
}

export default new SizeControlsUtils();
