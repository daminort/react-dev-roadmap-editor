import { all, takeEvery, put, call, fork, select } from 'redux-saga/effects';

import { diagram as defaultDiagram } from '../../resources';

import LocalStorageUtils from '../../utils/LocalStorageUtils';
import diagramActions from './actions';

import { selectDiagram } from './selectors';

function selectState(state) {

  return {
    diagram: selectDiagram(state),
  };
}

function* diagramStore() {

  yield takeEvery(diagramActions.DIAGRAM_STORE, function* () {
    const { diagram } = yield select(selectState);
    yield call(LocalStorageUtils.storeDiagram, diagram);
  });
}

function* diagramRestore() {

  yield takeEvery(diagramActions.DIAGRAM_RESTORE, function* () {
    let diagram = yield call(LocalStorageUtils.restoreDiagram);
    if (!diagram) {
      diagram = defaultDiagram;
    }
    yield put(diagramActions.shapesSet(diagram));
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

export default function* diagramSaga() {
  yield all([
    fork(diagramStore),
    fork(diagramRestore),
    fork(shapeSetColor),
  ]);
}
