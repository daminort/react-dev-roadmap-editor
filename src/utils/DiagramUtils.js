import { getShapesCount } from '../redux/utils';
import { THEME } from '../constants/theme';
import { TYPES } from '../constants/common';
import { ALIGN, DIRECTION } from '../constants/editor';

import MathUtils from './MathUtils';

const { bg } = THEME;

class DiagramUtils {

  constructor() {
    this.radiuses = {};
  }

  generateShapeID = (prefix = 'shape') => {
    const shapesCount = getShapesCount();
    return `${prefix}-${shapesCount}`;
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

  createCurve = (start, end) => {
    return {
      id        : this.generateShapeID('curve'),
      type      : TYPES.curve,
      startID   : start.id,
      endID     : end.id,
      x1        : start.x,
      y1        : start.y,
      x2        : end.x,
      y2        : end.y,
      dashed    : false,
      direction : DIRECTION.auto,
    };
  }

  createShapeContent = (id, title = '') => {
    return {
      id,
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

    const min          = Math.min(roundedWidth, roundedHeight);
    const radius       = (min / 10) * 1.5;
    this.radiuses[min] = radius;
    this[sidesKey]     = radius;

    return radius;
  }

  calculateBezier = (startX, startY, endX, endY, direction = DIRECTION.auto) => {

    const distanceX = Math.abs(endX - startX);
    const distanceY = Math.abs(endY - startY);
    const middleX   = Math.min(startX, endX) + (distanceX) / 2;
    const middleY   = Math.min(startY, endY) + (distanceY) / 2;

    const isVertical = (direction !== DIRECTION.auto)
      ? (direction === DIRECTION.vertical)
      : (distanceY >= distanceX);

    const cpx1 = isVertical ? startX  : middleX;
    const cpx2 = isVertical ? endX    : middleX;
    const cpy1 = isVertical ? middleY : startY;
    const cpy2 = isVertical ? middleY : endY;

    return {
      x1   : startX,
      y1   : startY,
      x2   : endX,
      y2   : endY,
      cpx1 : cpx1,
      cpy1 : cpy1,
      cpx2 : cpx2,
      cpy2 : cpy2,
    };
  }
}

export default new DiagramUtils();
