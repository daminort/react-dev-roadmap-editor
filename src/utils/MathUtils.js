import { gridStep } from '../config';
import { SIZE_CONTROLS } from '../constants/layout';
import { toInteger } from './lodash';

class MathUtils {

  isCircle = (shape) => {
    return toInteger(shape.radius) > 0;
  }

  roundCoord = (value, minValue = 0) => {
    const rounded = Math.round(value / gridStep) * gridStep;
    return rounded >= minValue ? rounded : minValue;
  }

  calculateResize = (shape, movementX, movementY, controlID)  => {
    let { x, y, width, height } = shape;
    switch (controlID) {
      case SIZE_CONTROLS.top: {
        y += movementY;
        height += movementY * (-1);
        break;
      }
      case SIZE_CONTROLS.bottom: {
        height += movementY;
        break;
      }
      case SIZE_CONTROLS.left: {
        x += movementX;
        width += movementX * (-1);
        break;
      }
      case SIZE_CONTROLS.right: {
        width += movementX;
        break;
      }
      default:
    }

    return {
      x,
      y,
      width,
      height,
    };
  }

  calculateMoving = (shape, movementX, movementY) => {

    return {
      x: shape.x + movementX,
      y: shape.y + movementY,
    };
  }

  determineShapeCentre = (shape) => {
    if (this.isCircle(shape)) {
      return {
        x: shape.x,
        y: shape.y,
      };
    }

    return {
      x: shape.x + (shape.width / 2),
      y: shape.y + (shape.height / 2),
    };
  }

  determineLineCenter = (line) => {
    const isVertical = (line.startX === line.endX);
    if (isVertical) {
      return {
        x: line.startX,
        y: line.startY + (line.endY - line.startY) / 2,
      };
    }

    return {
      x: line.startX + (line.endX - line.startX) / 2,
      y: line.startY,
    };
  }

  calculateDistance = (startShape, endShape) => {
    const startCentre = this.determineShapeCentre(startShape);
    const endCentre   = this.determineShapeCentre(endShape);

    return {
      startX : startCentre.x,
      startY : startCentre.y,
      endX   : endCentre.x,
      endY   : endCentre.y,
    };
  }

  calculateLineIntersection = (line1, line2) => {

    const x1 = line1.startX;
    const x2 = line1.endX;
    const x3 = line2.startX;
    const x4 = line2.endX;

    const y1 = line1.startY;
    const y2 = line1.endY;
    const y3 = line2.startY;
    const y4 = line2.endY;

    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
      return false;
    }

    const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // Lines are parallel
    if (denominator === 0) {
      return false;
    }

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }

    // Return a object with the x and y coordinates of the intersection
    const x = x1 + ua * (x2 - x1);
    const y = y1 + ua * (y2 - y1);

    return { x, y };
  }

  determineIntersection = (shape, vector) => {
    if (this.isCircle(shape)) {
      const { radius } = shape;
      const vectorEndX = vector.startX !== shape.x ? vector.startX : vector.endX;
      const vectorEndY = vector.startY !== shape.y ? vector.startY : vector.endY;

      const phi = Math.atan2(vectorEndY - shape.y, vectorEndX - shape.x);

      return {
        x: shape.x + radius * Math.cos(phi),
        y: shape.y + radius * Math.sin(phi),
      };
    }

    const vectorTop = {
      startX : shape.x,
      startY : shape.y,
      endX   : shape.x + shape.width,
      endY   : shape.y,
    };
    const vectorLeft = {
      startX : shape.x,
      startY : shape.y,
      endX   : shape.x,
      endY   : shape.y + shape.height,
    };
    const vectorRight = {
      startX : vectorTop.endX,
      startY : vectorTop.endY,
      endX   : vectorTop.endX,
      endY   : vectorTop.endY + shape.height,
    };
    const vectorBottom = {
      startX : vectorTop.startX,
      startY : vectorLeft.endY,
      endX   : vectorTop.endX,
      endY   : vectorRight.endY,
    };

    const intersectionTop = this.calculateLineIntersection(vectorTop, vector);
    if (intersectionTop) {
      return this.determineLineCenter(vectorTop);
    }

    const intersectionLeft = this.calculateLineIntersection(vectorLeft, vector);
    if (intersectionLeft) {
      return this.determineLineCenter(vectorLeft);
    }

    const intersectionRight = this.calculateLineIntersection(vectorRight, vector);
    if (intersectionRight) {
      return this.determineLineCenter(vectorRight);
    }

    const intersectionBottom = this.calculateLineIntersection(vectorBottom, vector);
    if (intersectionBottom) {
      return this.determineLineCenter(vectorBottom);
    }

    return {
      x: 0,
      y: 0,
    };
  }
}

export default new MathUtils();
