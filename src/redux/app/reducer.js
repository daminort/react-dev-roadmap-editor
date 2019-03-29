import actions from './actions';

const initState = {
  loading: false,
};

export default function appReducer(state = initState, { type, payload }) {

  switch (type) {
    case actions.LOADING_SET: {
      return {
        ...state,
        loading: payload.loading,
      };
    }
    default: {
      return state;
    }
  }
}
