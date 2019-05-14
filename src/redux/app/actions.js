import { makeActionCreator } from '../utils';

const prefix = 'App: ';
const TYPES = {
  LOADING_SET           : `${prefix}loadingSet`,
  ACTIVE_SHAPE_ID_SET   : `${prefix}activeShapeIDSet`,

  RESIZE_DATA_SET       : `${prefix}resizeDataSet`,
  RESIZE_DATA_RESET     : `${prefix}resizeDataReset`,
  RESIZE_COMPLETE       : `${prefix}resizeComplete`,

  CREATE_DATA_SET       : `${prefix}createDataSet`,
  CREATE_DATA_RESET     : `${prefix}createDataReset`,
  CREATE_COMPLETE       : `${prefix}createComplete`,
  CREATE_CURVE_COMPLETE : `${prefix}createCurveComplete`,

  DND_COMPLETE          : `${prefix}dndComplete`,

  PAGE_DATA_SET         : `${prefix}pageDataSet`,
  PAGE_DATA_RESET       : `${prefix}pageDataReset`,
};

const actions = {
  ...TYPES,
  loadingSet          : makeActionCreator(TYPES.LOADING_SET, 'loading'),
  activeShapeIDSet    : makeActionCreator(TYPES.ACTIVE_SHAPE_ID_SET, 'shapeID'),

  resizeDataSet       : makeActionCreator(TYPES.RESIZE_DATA_SET, 'resizeData'),
  resizeDataReset     : makeActionCreator(TYPES.RESIZE_DATA_RESET),
  resizeComplete      : makeActionCreator(TYPES.RESIZE_COMPLETE),

  createDataSet       : makeActionCreator(TYPES.CREATE_DATA_SET, 'createData'),
  createDataReset     : makeActionCreator(TYPES.CREATE_DATA_RESET),
  createComplete      : makeActionCreator(TYPES.CREATE_COMPLETE, 'position'),
  createCurveComplete : makeActionCreator(TYPES.CREATE_CURVE_COMPLETE, 'startShapeID', 'endShapeID'),

  dndComplete         : makeActionCreator(TYPES.DND_COMPLETE, 'position'),

  pageDataSet         : makeActionCreator(TYPES.PAGE_DATA_SET, 'pageData'),
  pageDataReset       : makeActionCreator(TYPES.PAGE_DATA_RESET),
};

export default actions;
