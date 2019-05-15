import { TYPES } from '../constants/common';
import { SIZE_CONTROLS } from '../constants/layout';
import { THEME } from '../constants/theme';
import { invert } from './lodash';

const { sizeControls } = THEME;
const ivertedControls = invert(SIZE_CONTROLS);

class SizeControlsUtils {

  createCurveDefault = (value) => {
    return {
      start : value,
      end   : value,
    };
  }

  createBoxDefault = (value) => {
    return {
      top    : value,
      bottom : value,
      left   : value,
      right  : value,
    };
  }

  createColors = (shapeType) => {
    return shapeType === TYPES.curve
      ? this.createCurveDefault(sizeControls.inactive)
      : this.createBoxDefault(sizeControls.inactive);
  };

  createSizes = (shapeType) => {
    return shapeType === TYPES.curve
      ? this.createCurveDefault(4)
      : this.createBoxDefault(4);
  };

  createRadius = (shapeType) => {
    return shapeType === TYPES.curve
      ? this.createCurveDefault(0)
      : this.createBoxDefault(0);
  };

  createStyles = (shapeType) => {
    switch (shapeType) {
      case TYPES.curve:
        return {
          start : { cursor: 'crosshair' },
          end   : { cursor: 'crosshair' },
        };
      default:
        return {
          top    : { cursor: 'ns-resize' },
          bottom : { cursor: 'ns-resize' },
          left   : { cursor: 'ew-resize' },
          right  : { cursor: 'ew-resize' },
        };
    }
  }

  createCurvePosition = (shape, sizes) => {
    const { x1, y1, x2, y2 } = shape;
    const { start, end } = sizes;

    const startX = x1 - (start / 2);
    const startY = y1 - (start / 2);
    const endX   = x2 - (end / 2);
    const endY   = y2 - (end / 2);

    return {
      start : { x: startX, y: startY },
      end   : { x: endX, y: endY },
    };
  }

  createBoxPosition = (shape, sizes) => {
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

  createPosition = (shapeType, shape, sizes) => {
    return shapeType === TYPES.curve
      ? this.createCurvePosition(shape, sizes)
      : this.createBoxPosition(shape, sizes);
  }

  detectActiveKey = (activeControl = '') => {
    return ivertedControls[activeControl];
  }

  makeControls = (shapeType, shape, activeControl = '') => {
    const colors    = this.createColors(shapeType);
    const sizes     = this.createSizes(shapeType);
    const radius    = this.createRadius(shapeType);
    const styles    = this.createStyles(shapeType);
    const activeKey = this.detectActiveKey(activeControl);

    if (activeKey) {
      colors[activeKey] = sizeControls.active;
      sizes[activeKey]  = 8;
      radius[activeKey] = 1.5;
    }

    const positions = this.createPosition(shapeType, shape, sizes);

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
