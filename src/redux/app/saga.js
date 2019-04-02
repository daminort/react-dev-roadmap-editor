import { all, takeEvery, put, fork, select } from 'redux-saga/effects';

import { gridStep } from '../../config';
import MathUtils from '../../utils/MathUtils';

import diagramActions from '../diagram/actions';
import appActions from './actions';

import { selectDiagramItem } from '../diagram/selectors';

const minCellWH = gridStep * 2;

function selectState(state) {
  const { App } = state;
  const { activeItemID } = App;

  return {
    activeItemID,
    activeItem: selectDiagramItem(activeItemID)(state),
  };
}

function* resizeComplete() {

  yield takeEvery(appActions.RESIZE_COMPLETE, function* () {

    const { activeItemID, activeItem } = yield select(selectState);
    const { x, y, width, height } = activeItem;

    const resItem = {
      ...activeItem,
      x      : MathUtils.roundCoord(x),
      y      : MathUtils.roundCoord(y),
      width  : MathUtils.roundCoord(width, minCellWH),
      height : MathUtils.roundCoord(height, minCellWH),
    };

    yield put(diagramActions.itemSet(activeItemID, resItem));
    yield put(diagramActions.diagramStore());
    yield put(appActions.resizeDataReset());
  });
}

function* dndComplete() {

  yield takeEvery(appActions.DND_COMPLETE, function* ({ payload }) {

    const { activeItemID, activeItem } = yield select(selectState);
    const { position } = payload;
    const { x, y } = position;

    const resItem = {
      ...activeItem,
      x : MathUtils.roundCoord(x),
      y : MathUtils.roundCoord(y),
    };

    yield put(diagramActions.itemSet(activeItemID, resItem));
    yield put(diagramActions.diagramStore());
  });
}

export default function* appSaga() {
  yield all([
    fork(resizeComplete),
    fork(dndComplete),
  ]);
}
