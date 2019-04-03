import { makeActionCreator } from '../utils';

const prefix = 'Diagram:';
const TYPES = {
  DIAGRAM_STORE   : `${prefix}diagramStore`,
  DIAGRAM_RESTORE : `${prefix}diagramRestore`,

  SHAPES_SET      : `${prefix}shapesSet`,
  SHAPES_RESET    : `${prefix}shapesReset`,

  SHAPE_SET       : `${prefix}shapeSet`,
  SHAPE_UPDATE    : `${prefix}shapeUpdate`,

  SHAPE_SET_COLOR : `${prefix}shapeSetColor`,
};

const actions = {
  ...TYPES,
  diagramStore   : makeActionCreator(TYPES.DIAGRAM_STORE),
  diagramRestore : makeActionCreator(TYPES.DIAGRAM_RESTORE),

  shapesSet      : makeActionCreator(TYPES.SHAPES_SET, 'shapes'),
  shapesReset    : makeActionCreator(TYPES.SHAPES_RESET),

  shapeSet       : makeActionCreator(TYPES.SHAPE_SET, 'id', 'shape'),
  shapeUpdate    : makeActionCreator(TYPES.SHAPE_UPDATE, 'id', 'shape'),

  shapeSetColor  : makeActionCreator(TYPES.SHAPE_SET_COLOR, 'id', 'color'),
};

export default actions;
