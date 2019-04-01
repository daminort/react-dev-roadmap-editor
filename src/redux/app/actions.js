import { makeActionCreator } from '../utils';

const prefix = 'App:';
const TYPES = {
  LOADING_SET     : `${prefix}loadingSet`,
  ACTIVE_ITEM_SET : `${prefix}activeItemSet`,

  RESIZE_DATA_SET : `${prefix}resizeDataSet`,
  RESIZE_DATA_RESET : `${prefix}resizeDataReset`,
};

const actions = {
  ...TYPES,
  loadingSet      : makeActionCreator(TYPES.LOADING_SET, 'loading'),
  activeItemSet   : makeActionCreator(TYPES.ACTIVE_ITEM_SET, 'itemID'),

  resizeDataSet   : makeActionCreator(TYPES.RESIZE_DATA_SET, 'resizeData'),
  resizeDataReset : makeActionCreator(TYPES.RESIZE_DATA_RESET),
};

export default actions;
