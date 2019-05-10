import { all, takeEvery, put, fork, select } from 'redux-saga/effects';

import MathUtils from '../../utils/MathUtils';
import DiagramUtils from '../../utils/DiagramUtils';
import { gridStep } from '../../config';
import { TYPES } from '../../constants/common';
import { SIZE_CONTROLS } from '../../constants/layout';

import diagramActions from '../diagram/actions';
import appActions from './actions';

import { selectShape } from '../diagram/selectors';
import { selectResizeData, selectCreateData } from './selectors';

const minCellWH = gridStep * 2;

function selectState(state) {
  const { App, Diagram } = state;
  const { activeShapeID } = App;

  return {
    activeShapeID,
    activeShape : selectShape(activeShapeID)(state),
    resizeData  : selectResizeData(state),
    createData  : selectCreateData(state),
    shapes      : Diagram.shapes,
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

function* createComplete() {

  yield takeEvery(appActions.CREATE_COMPLETE, function* ({ payload }) {

    const { createData } = yield select(selectState);
    const { shapeType } = createData;
    const { position } = payload;
    const { x, y } = position;

    const resX = MathUtils.roundCoord(x);
    const resY = MathUtils.roundCoord(y);

    // Box
    if (shapeType === TYPES.box) {
      const shape = DiagramUtils.createBox(resX, resY);
      const shapeContent = DiagramUtils.createShapeContent(shape.id);

      yield put(diagramActions.shapeContentSet(shape.id, shapeContent));
      yield put(diagramActions.shapeSet(shape.id, shape));
      yield put(appActions.activeShapeIDSet(shape.id));
    }

    // Circle
    if (shapeType === TYPES.circle) {
      const shape = DiagramUtils.createCircle(resX, resY);

      yield put(diagramActions.shapeSet(shape.id, shape));
      yield put(appActions.activeShapeIDSet(shape.id));
    }

    yield put(diagramActions.diagramStore());
    yield put(appActions.createDataReset());
  });
}

function* createCurveComplete() {

  yield takeEvery(appActions.CREATE_CURVE_COMPLETE, function* ({ payload }) {

    const { shapes } = yield select(selectState);
    const { startShapeID, endShapeID } = payload;

    const startShape = shapes[startShapeID];
    const endShape   = shapes[endShapeID];

    const distanceVector = MathUtils.calculateDistance(startShape, endShape);
    const start = MathUtils.determineIntersection(startShape, distanceVector);
    const end = MathUtils.determineIntersection(endShape, distanceVector);

    start.id = startShapeID;
    end.id   = endShapeID;

    const curve = DiagramUtils.createCurve(start, end);

    yield put(diagramActions.shapeSet(curve.id, curve));
    yield put(appActions.activeShapeIDSet(''));
    yield put(diagramActions.diagramStore());
    yield put(appActions.createDataReset());
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
    fork(createComplete),
    fork(createCurveComplete),
  ]);
}
