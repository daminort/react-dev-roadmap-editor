import { all, takeEvery, put, fork, select } from 'redux-saga/effects';

import { gridStep } from '../../config';
import { SIZE_CONTROLS } from '../../constants/layout';
import MathUtils from '../../utils/MathUtils';

import diagramActions from '../diagram/actions';
import appActions from './actions';

import { selectShape } from '../diagram/selectors';
import { selectResizeData } from './selectors';

const minCellWH = gridStep * 2;

function selectState(state) {
  const { App } = state;
  const { activeShapeID } = App;

  return {
    activeShapeID,
    activeShape : selectShape(activeShapeID)(state),
    resizeData  : selectResizeData(state),
  };
}

function* resizeComplete() {

  yield takeEvery(appActions.RESIZE_COMPLETE, function* () {

    const { activeShapeID, activeShape, resizeData } = yield select(selectState);
    const { x, y, width, height } = activeShape;
    const { controlID } = resizeData;

    const isTop    = (controlID === SIZE_CONTROLS.top);
    const isBottom = (controlID === SIZE_CONTROLS.bottom);
    const isLeft   = (controlID === SIZE_CONTROLS.left);
    const isRight  = (controlID === SIZE_CONTROLS.right);

    const resShape = {
      x      : isLeft ? MathUtils.roundCoord(x) : x,
      y      : isTop  ? MathUtils.roundCoord(y) : y,
      width  : (isLeft || isRight) ? MathUtils.roundCoord(width, minCellWH) : width,
      height : (isTop || isBottom) ? MathUtils.roundCoord(height, minCellWH) : height,
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
