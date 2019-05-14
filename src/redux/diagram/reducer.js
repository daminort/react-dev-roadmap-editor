import CommonUtils from '../../utils/CommonUtils';
import { cloneDeep } from '../../utils/lodash';
import actions from './actions';

const initState = {
  shapes  : [],
  content : [],
};

export default function diagramReducer(state = initState, { type, payload }) {

  switch (type) {
    case actions.SHAPES_SET: {
      return {
        ...state,
        shapes: { ...payload.shapes },
      };
    }
    case actions.SHAPES_RESET: {
      return {
        ...state,
        shapes: {},
      };
    }
    case actions.SHAPE_SET: {
      const shapes = cloneDeep(state.shapes);
      const { id, shape } = payload;
      shapes[id] = shape;

      return {
        ...state,
        shapes,
      };
    }
    case actions.SHAPE_UPDATE: {
      const shapes = cloneDeep(state.shapes);
      const { id, shape } = payload;
      const initShape = shapes[id];
      shapes[id] = CommonUtils.safeMerge(initShape, shape);

      return {
        ...state,
        shapes,
      };
    }

    case actions.CONTENT_SET: {
      return {
        ...state,
        content: { ...payload.content },
      };
    }
    case actions.CONTENT_RESET: {
      return {
        ...state,
        content: {},
      };
    }
    case actions.SHAPE_CONTENT_SET: {
      const content = cloneDeep(state.content);
      const { id, shapeContent } = payload;
      content[id] = shapeContent;

      return {
        ...state,
        content,
      };
    }
    case actions.SHAPE_CONTENT_UPDATE: {
      const content = cloneDeep(state.content);
      const { id, shapeContent } = payload;
      const initShapeContent = content[id];
      content[id] = CommonUtils.safeMerge(initShapeContent, shapeContent);

      return {
        ...state,
        content,
      };
    }
    default: {
      return state;
    }
  }
}
