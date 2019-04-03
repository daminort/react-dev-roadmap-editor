import CommonUtils from '../../utils/CommonUtils';
import { diagram } from '../../resources';
import actions from './actions';

const initState = {
  ...diagram,
};

export default function diagramReducer(state = initState, { type, payload }) {

  switch (type) {
    case actions.SHAPES_SET: {
      return {
        ...payload.shapes,
      };
    }
    case actions.SHAPES_RESET: {
      return {};
    }
    case actions.SHAPE_SET: {
      const { id, shape } = payload;
      return {
        ...state,
        [id]: shape,
      };
    }
    case actions.SHAPE_UPDATE: {
      const { id, shape } = payload;
      const initShape = state[id];
      return {
        ...state,
        [id]: CommonUtils.safeMerge(initShape, shape),
      };
    }
    default: {
      return state;
    }
  }
}
