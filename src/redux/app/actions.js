import { makeActionCreator } from '../utils';

const prefix = 'App:';
const TYPES = {
  LOADING_SET       : `${prefix}loadingSet`,
  ACTIVE_ITEM_SET   : `${prefix}activeItemSet`,

  RESIZE_DATA_SET   : `${prefix}resizeDataSet`,
  RESIZE_DATA_RESET : `${prefix}resizeDataReset`,
  RESIZE_COMPLETE   : `${prefix}resizeComplete`,

  DND_COMPLETE      : `${prefix}dndComplete`,
};

const actions = {
  ...TYPES,
  loadingSet      : makeActionCreator(TYPES.LOADING_SET, 'loading'),
  activeItemSet   : makeActionCreator(TYPES.ACTIVE_ITEM_SET, 'itemID'),

  resizeDataSet   : makeActionCreator(TYPES.RESIZE_DATA_SET, 'resizeData'),
  resizeDataReset : makeActionCreator(TYPES.RESIZE_DATA_RESET),
  resizeComplete  : makeActionCreator(TYPES.RESIZE_COMPLETE),

  dndComplete     : makeActionCreator(TYPES.DND_COMPLETE, 'position'),
};

export default actions;
