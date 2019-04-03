import { all, takeEvery, put, call, fork, select } from 'redux-saga/effects';

import { diagram as defaultDiagram } from '../../resources';

import LocalStorageUtils from '../../utils/LocalStorageUtils';
import { cloneDeep, unset } from '../../utils/lodash';

import diagramActions from './actions';
import { selectShapes } from './selectors';

function selectState(state) {

  return {
    shapes: selectShapes(state),
  };
}

function* diagramStore() {

  yield takeEvery(diagramActions.DIAGRAM_STORE, function* () {
    const { shapes } = yield select(selectState);
    yield call(LocalStorageUtils.storeDiagram, shapes);
  });
}

function* diagramRestore() {

  yield takeEvery(diagramActions.DIAGRAM_RESTORE, function* () {
    let shapes = yield call(LocalStorageUtils.restoreDiagram);
    if (!shapes) {
      shapes = defaultDiagram;
    }
    yield put(diagramActions.shapesSet(shapes));
  });
}

function* shapeSetColor() {

  yield takeEvery(diagramActions.SHAPE_SET_COLOR, function* ({ payload }) {

    const { id, color } = payload;
    const resShape = {
      bg: color,
    };

    yield put(diagramActions.shapeUpdate(id, resShape));
    yield put(diagramActions.diagramStore());
  });
}

function* shapeRemove() {

  yield takeEvery(diagramActions.SHAPE_REMOVE, function* ({ payload }) {

    const { id } = payload;
    const { shapes } = yield select(selectState);

    const resShapes = cloneDeep(shapes);
    unset(resShapes, id);

    yield put(diagramActions.shapesSet(resShapes));
    yield put(diagramActions.diagramStore());
  });
}

export default function* diagramSaga() {
  yield all([
    fork(diagramStore),
    fork(diagramRestore),
    fork(shapeSetColor),
    fork(shapeRemove),
  ]);
}
