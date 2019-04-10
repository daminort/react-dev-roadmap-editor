import { getShapesCount } from '../redux/utils';
import { THEME } from '../constants/theme';
import { TYPES } from '../constants/common';
import { ALIGN } from '../constants/editor';

import MathUtils from './MathUtils';

const { bg } = THEME;

class DiagramUtils {

  constructor() {
    this.radiuses = {};
    this.sides    = {};
  }

  generateShapeID = () => {
    const shapesCount = getShapesCount();
    return `shape-${shapesCount}`;
  }

  createBox = (x, y) => {
    return {
      id       : this.generateShapeID(),
      type     : TYPES.box,
      x        : x || 10,
      y        : y || 10,
      width    : 120,
      height   : 30,
      bg       : bg.grey,
      align    : ALIGN.center,
      noBorder : false,
    };
  }

  createShapeContent = (id, title = '') => {
    return {
      title : title || id,
      url   : '',
      info  : '',
    };
  }

  calculateBorderRadius = (width, height) => {
    const roundedWidth  = MathUtils.roundCoord(width);
    const roundedHeight = MathUtils.roundCoord(height);
    const sidesKey = `${roundedWidth}:${roundedHeight}`;
    if (this[sidesKey]) {
      return this[sidesKey];
    }

    const min = Math.min(roundedWidth, roundedHeight);
    if (this.radiuses[min]) {
      this[sidesKey] = this.radiuses[min];
      return this.radiuses[min];
    }

    const radius       = (min / 10) * 1.5;
    this.radiuses[min] = radius;
    this[sidesKey]     = radius;

    return radius;
  }
}

export default new DiagramUtils();
