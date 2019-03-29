import { makeActionCreator } from '../utils';

const prefix = 'Diagram:';
const TYPES = {
  ITEMS_SET   : `${prefix}itemsSet`,
  ITEMS_RESET : `${prefix}itemsReset`,
  ITEM_SET    : `${prefix}itemSet`,
};

const actions = {
  ...TYPES,
  itemsSet   : makeActionCreator(TYPES.ITEMS_SET, 'item'),
  itemsReset : makeActionCreator(TYPES.ITEMS_RESET),
  itemSet    : makeActionCreator(TYPES.ITEM_SET, 'id', 'item'),
};

export default actions;
