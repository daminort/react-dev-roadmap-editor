import { gridStep } from '../config';
import { SIZE_CONTROLS } from '../constants/layout';

class MathUtils {

  roundCoord = (value, minValue = 0) => {
    const rounded = Math.round(value / gridStep) * gridStep;
    return rounded >= minValue ? rounded : minValue;
  }

  calculateResize = (currentPos, clientX, clientY, controlID)  => {
    let { x, y, width, height } = currentPos;
    switch (controlID) {
      case SIZE_CONTROLS.top: {
        const delta = y - clientY;
        y = clientY;
        height += delta;
        break;
      }
      case SIZE_CONTROLS.bottom: {
        const delta = clientY - (y + height);
        height += delta;
        break;
      }
      case SIZE_CONTROLS.left: {
        const delta = x - clientX;
        x = clientX;
        width += delta;
        break;
      }
      case SIZE_CONTROLS.right: {
        const delta = clientX - (x + width);
        width += delta;
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
}

export default new MathUtils();
