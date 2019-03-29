import actions from './actions';
import { diagram } from '../../resources';

const initState = {
  ...diagram,
};

export default function diagramReducer(state = initState, { type, payload }) {

  switch (type) {
    case actions.ITEMS_SET: {
      return {
        ...payload.items,
      };
    }
    case actions.ITEMS_RESET: {
      return {};
    }
    case actions.ITEM_SET: {
      const { id, item } = payload;
      return {
        ...state,
        [id]: item,
      };
    }
    default: {
      return state;
    }
  }
}
