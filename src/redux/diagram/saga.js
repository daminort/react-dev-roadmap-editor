import { all, takeEvery, put, call, fork, select } from 'redux-saga/effects';

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
    const diagram = yield call(LocalStorageUtils.restoreDiagram, {});
    yield put(diagramActions.itemsSet(diagram));
  });
}

export default function* diagramSaga() {
  yield all([
    fork(diagramStore),
    fork(diagramRestore),
  ]);
}
