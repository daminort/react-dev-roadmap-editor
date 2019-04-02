import { makeActionCreator } from '../utils';

const prefix = 'Diagram:';
const TYPES = {
  DIAGRAM_STORE   : `${prefix}diagramStore`,
  DIAGRAM_RESTORE : `${prefix}diagramRestore`,

  ITEMS_SET       : `${prefix}itemsSet`,
  ITEMS_RESET     : `${prefix}itemsReset`,
  ITEM_SET        : `${prefix}itemSet`,
};

const actions = {
  ...TYPES,
  diagramStore   : makeActionCreator(TYPES.DIAGRAM_STORE),
  diagramRestore : makeActionCreator(TYPES.DIAGRAM_RESTORE),

  itemsSet       : makeActionCreator(TYPES.ITEMS_SET, 'items'),
  itemsReset     : makeActionCreator(TYPES.ITEMS_RESET),
  itemSet        : makeActionCreator(TYPES.ITEM_SET, 'id', 'item'),
};

export default actions;
