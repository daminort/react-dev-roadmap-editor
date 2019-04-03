import { all, takeEvery, put, fork, select } from 'redux-saga/effects';

import { gridStep } from '../../config';
import MathUtils from '../../utils/MathUtils';

import diagramActions from '../diagram/actions';
import appActions from './actions';

import { selectDiagramShape } from '../diagram/selectors';

const minCellWH = gridStep * 2;

function selectState(state) {
  const { App } = state;
  const { activeShapeID } = App;

  return {
    activeShapeID,
    activeShape: selectDiagramShape(activeShapeID)(state),
  };
}

function* resizeComplete() {

  yield takeEvery(appActions.RESIZE_COMPLETE, function* () {

    const { activeShapeID, activeShape } = yield select(selectState);
    const { x, y, width, height } = activeShape;

    const resShape = {
      x      : MathUtils.roundCoord(x),
      y      : MathUtils.roundCoord(y),
      width  : MathUtils.roundCoord(width, minCellWH),
      height : MathUtils.roundCoord(height, minCellWH),
    };

    yield put(diagramActions.shapeUpdate(activeShapeID, resShape));
    yield put(diagramActions.diagramStore());
    yield put(appActions.resizeDataReset());
  });
}

function* dndComplete() {

  yield takeEvery(appActions.DND_COMPLETE, function* ({ payload }) {

    const { activeShapeID } = yield select(selectState);
    const { position } = payload;
    const { x, y } = position;

    const resPosition = {
      x : MathUtils.roundCoord(x),
      y : MathUtils.roundCoord(y),
    };

    yield put(diagramActions.shapeUpdate(activeShapeID, resPosition));
    yield put(diagramActions.diagramStore());
  });
}

export default function* appSaga() {
  yield all([
    fork(resizeComplete),
    fork(dndComplete),
  ]);
}
