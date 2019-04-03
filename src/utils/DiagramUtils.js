import { getShapesCount } from '../redux/utils';
import { THEME } from '../constants/theme';
import { TYPES } from '../constants/common';
import { ALIGN } from '../constants/editor';

const { bg } = THEME;

class DiagramUtils {

  generateShapeID = () => {
    const shapesCount = getShapesCount();
    return `Shape-${shapesCount}`;
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
}

export default new DiagramUtils();
