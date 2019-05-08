import CommonUtils from '../../utils/CommonUtils';
import { PAGE } from '../../constants/editor';
import actions from './actions';

const initState = {
  loading       : false,
  activeShapeID : '',

  page: {
    width  : PAGE.width,
    height : PAGE.height,
    scale  : PAGE.scale,
  },

  resize: {
    shapeID    : '',
    controlID  : '',
    initX      : 0,
    initY      : 0,
    initWidth  : 0,
    initHeight : 0,
  },

  create: {
    shapeType     : null,
    sourceShapeID : '',
    targetShapeID : '',
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
    case actions.CREATE_DATA_SET: {
      const { create } = state;
      const { createData } = payload;
      return {
        ...state,
        create: CommonUtils.safeMerge(create, createData),
      };
    }
    case actions.CREATE_DATA_RESET: {
      return {
        ...state,
        create: initState.create,
      };
    }
    case actions.PAGE_DATA_SET: {
      const { page } = state;
      const { pageData } = payload;
      return {
        ...state,
        page: CommonUtils.safeMerge(page, pageData),
      };
    }
    case actions.PAGE_DATA_RESET: {
      return {
        ...state,
        page: initState.page,
      };
    }
    default: {
      return state;
    }
  }
}
