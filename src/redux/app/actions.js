import { makeActionCreator } from '../utils';

const prefix = 'App:';
const TYPES = {
  LOADING_SET         : `${prefix}loadingSet`,
  ACTIVE_SHAPE_ID_SET : `${prefix}activeShapeIDSet`,

  RESIZE_DATA_SET     : `${prefix}resizeDataSet`,
  RESIZE_DATA_RESET   : `${prefix}resizeDataReset`,
  RESIZE_COMPLETE     : `${prefix}resizeComplete`,

  DND_COMPLETE        : `${prefix}dndComplete`,

  PAGE_DATA_SET       : `${prefix}pageDataSet`,
  PAGE_DATA_RESET     : `${prefix}pageDataReset`,
};

const actions = {
  ...TYPES,
  loadingSet       : makeActionCreator(TYPES.LOADING_SET, 'loading'),
  activeShapeIDSet : makeActionCreator(TYPES.ACTIVE_SHAPE_ID_SET, 'shapeID'),

  resizeDataSet    : makeActionCreator(TYPES.RESIZE_DATA_SET, 'resizeData'),
  resizeDataReset  : makeActionCreator(TYPES.RESIZE_DATA_RESET),
  resizeComplete   : makeActionCreator(TYPES.RESIZE_COMPLETE),

  dndComplete      : makeActionCreator(TYPES.DND_COMPLETE, 'position'),

  pageDataSet      : makeActionCreator(TYPES.PAGE_DATA_SET, 'pageData'),
  pageDataReset    : makeActionCreator(TYPES.PAGE_DATA_RESET),
};

export default actions;
