import { makeActionCreator } from '../utils';

const prefix = 'Diagram: ';
const TYPES = {
  DIAGRAM_STORE           : `${prefix}diagramStore`,
  DIAGRAM_RESTORE         : `${prefix}diagramRestore`,
  DIAGRAM_DOWNLOAD        : `${prefix}diagramDownload`,
  DIAGRAM_RESET           : `${prefix}diagramReset`,

  DOWNLOAD_DATA_UPDATE    : `${prefix}downloadDataUpdate`,
  DOWNLOAD_START          : `${prefix}downloadStart`,

  UPLOAD_FILE_SELECT      : `${prefix}uploadFileSelect`,
  UPLOAD_START            : `${prefix}uploadStart`,

  SHAPES_SET              : `${prefix}shapesSet`,
  SHAPES_RESET            : `${prefix}shapesReset`,

  SHAPE_SET               : `${prefix}shapeSet`,
  SHAPE_UPDATE            : `${prefix}shapeUpdate`,
  SHAPE_REMOVE            : `${prefix}shapeRemove`,
  SHAPE_MOVE              : `${prefix}shapeMove`,

  SHAPE_SET_COLOR         : `${prefix}shapeSetColor`,
  SHAPE_SET_ALIGNMENT     : `${prefix}shapeSetAlignment`,
  SHAPE_SET_DASHED        : `${prefix}shapeSetDashed`,
  SHAPE_SET_NO_BORDER     : `${prefix}shapeSetNoBorder`,
  SHAPE_SET_TEXT_BOLD     : `${prefix}shapeSetTextBold`,
  SHAPE_SET_TEXT_SIZE     : `${prefix}shapeSetTextSize`,

  CONTENT_SET             : `${prefix}contentSet`,
  CONTENT_RESET           : `${prefix}contentReset`,

  SHAPE_CONTENT_SET       : `${prefix}shapeContentSet`,
  SHAPE_CONTENT_UPDATE    : `${prefix}shapeContentUpdate`,
  SHAPE_CONTENT_REMOVE    : `${prefix}shapeContentRemove`,
};

const actions = {
  ...TYPES,
  diagramStore          : makeActionCreator(TYPES.DIAGRAM_STORE),
  diagramRestore        : makeActionCreator(TYPES.DIAGRAM_RESTORE),
  diagramDownload       : makeActionCreator(TYPES.DIAGRAM_DOWNLOAD),
  diagramReset          : makeActionCreator(TYPES.DIAGRAM_RESET),

  downloadDataUpdate    : makeActionCreator(TYPES.DOWNLOAD_DATA_UPDATE, 'downloadData'),
  downloadStart         : makeActionCreator(TYPES.DOWNLOAD_START),

  uploadFileSelect      : makeActionCreator(TYPES.UPLOAD_FILE_SELECT),
  uploadStart           : makeActionCreator(TYPES.UPLOAD_START, 'file'),

  shapesSet             : makeActionCreator(TYPES.SHAPES_SET, 'shapes'),
  shapesReset           : makeActionCreator(TYPES.SHAPES_RESET),

  shapeSet              : makeActionCreator(TYPES.SHAPE_SET, 'id', 'shape'),
  shapeUpdate           : makeActionCreator(TYPES.SHAPE_UPDATE, 'id', 'shape'),
  shapeRemove           : makeActionCreator(TYPES.SHAPE_REMOVE, 'id'),
  shapeMove             : makeActionCreator(TYPES.SHAPE_MOVE, 'id', 'movementX', 'movementY'),

  shapeSetColor         : makeActionCreator(TYPES.SHAPE_SET_COLOR, 'id', 'color'),
  shapeSetAlignment     : makeActionCreator(TYPES.SHAPE_SET_ALIGNMENT, 'id', 'align'),
  shapeSetDashed        : makeActionCreator(TYPES.SHAPE_SET_DASHED, 'id', 'dashed'),
  shapeSetNoBorder      : makeActionCreator(TYPES.SHAPE_SET_NO_BORDER, 'id', 'noBorder'),
  shapeSetTextBold      : makeActionCreator(TYPES.SHAPE_SET_TEXT_BOLD, 'id'),
  shapeSetTextSize      : makeActionCreator(TYPES.SHAPE_SET_TEXT_SIZE, 'id'),

  contentSet            : makeActionCreator(TYPES.CONTENT_SET, 'content'),
  contentReset          : makeActionCreator(TYPES.CONTENT_RESET),

  shapeContentSet       : makeActionCreator(TYPES.SHAPE_CONTENT_SET, 'id', 'shapeContent'),
  shapeContentUpdate    : makeActionCreator(TYPES.SHAPE_CONTENT_UPDATE, 'id', 'shapeContent'),
  shapeContentRemove    : makeActionCreator(TYPES.SHAPE_CONTENT_REMOVE, 'id'),
};

export default actions;
