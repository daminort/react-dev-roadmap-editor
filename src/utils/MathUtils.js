import { gridStep } from '../config';
import { SIZE_CONTROLS } from '../constants/layout';

class MathUtils {

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
}

export default new MathUtils();
