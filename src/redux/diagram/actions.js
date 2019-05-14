import { makeActionCreator } from '../utils';

const prefix = 'Diagram:';
const TYPES = {
  DIAGRAM_STORE        : `${prefix}diagramStore`,
  DIAGRAM_RESTORE      : `${prefix}diagramRestore`,

  SHAPES_SET           : `${prefix}shapesSet`,
  SHAPES_RESET         : `${prefix}shapesReset`,

  SHAPE_SET            : `${prefix}shapeSet`,
  SHAPE_UPDATE         : `${prefix}shapeUpdate`,
  SHAPE_REMOVE         : `${prefix}shapeRemove`,
  SHAPE_MOVE           : `${prefix}shapeMove`,

  SHAPE_SET_COLOR      : `${prefix}shapeSetColor`,
  SHAPE_SET_ALIGNMENT  : `${prefix}shapeSetAlignment`,

  CONTENT_SET          : `${prefix}contentSet`,
  CONTENT_RESET        : `${prefix}contentReset`,

  SHAPE_CONTENT_SET    : `${prefix}shapeContentSet`,
  SHAPE_CONTENT_UPDATE : `${prefix}shapeContentUpdate`,
  SHAPE_CONTENT_REMOVE : `${prefix}shapeContentRemove`,
};

const actions = {
  ...TYPES,
  diagramStore       : makeActionCreator(TYPES.DIAGRAM_STORE),
  diagramRestore     : makeActionCreator(TYPES.DIAGRAM_RESTORE),

  shapesSet          : makeActionCreator(TYPES.SHAPES_SET, 'shapes'),
  shapesReset        : makeActionCreator(TYPES.SHAPES_RESET),

  shapeSet           : makeActionCreator(TYPES.SHAPE_SET, 'id', 'shape'),
  shapeUpdate        : makeActionCreator(TYPES.SHAPE_UPDATE, 'id', 'shape'),
  shapeRemove        : makeActionCreator(TYPES.SHAPE_REMOVE, 'id'),
  shapeMove          : makeActionCreator(TYPES.SHAPE_MOVE, 'id', 'movementX', 'movementY'),

  shapeSetColor      : makeActionCreator(TYPES.SHAPE_SET_COLOR, 'id', 'color'),
  shapeSetAlignment  : makeActionCreator(TYPES.SHAPE_SET_ALIGNMENT, 'id', 'align'),

  contentSet         : makeActionCreator(TYPES.CONTENT_SET, 'content'),
  contentReset       : makeActionCreator(TYPES.CONTENT_RESET),

  shapeContentSet    : makeActionCreator(TYPES.SHAPE_CONTENT_SET, 'id', 'shapeContent'),
  shapeContentUpdate : makeActionCreator(TYPES.SHAPE_CONTENT_UPDATE, 'id', 'shapeContent'),
  shapeContentRemove : makeActionCreator(TYPES.SHAPE_CONTENT_REMOVE, 'id'),
};

export default actions;
