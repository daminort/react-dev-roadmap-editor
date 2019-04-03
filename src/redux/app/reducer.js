import CommonUtils from '../../utils/CommonUtils';
import actions from './actions';

const initState = {
  loading       : false,
  activeShapeID : '',

  resize: {
    shapeID    : '',
    controlID  : '',
    initX      : 0,
    initY      : 0,
    initWidth  : 0,
    initHeight : 0,
  },
};

export default function appReducer(state = initState, { type, payload }) {

  switch (type) {
    case actions.LOADING_SET: {
      return {
        ...state,
        loading: payload.loading,
      };
    }
    case actions.ACTIVE_SHAPE_ID_SET: {
      return {
        ...state,
        activeShapeID: payload.shapeID,
      };
    }
    case actions.RESIZE_DATA_SET: {
      const { resize } = state;
      const { resizeData } = payload;
      return {
        ...state,
        resize: CommonUtils.safeMerge(resize, resizeData),
      };
    }
    case actions.RESIZE_DATA_RESET: {
      return {
        ...state,
        resize: initState.resize,
      };
    }
    default: {
      return state;
    }
  }
}
