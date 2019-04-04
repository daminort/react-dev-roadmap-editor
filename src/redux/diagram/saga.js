import { all, takeEvery, put, call, fork, select } from 'redux-saga/effects';

import {
  shapes as defaultShapes,
  content as defaultContent,
} from '../../resources';

import LocalStorageUtils from '../../utils/LocalStorageUtils';
import { cloneDeep, unset } from '../../utils/lodash';

import diagramActions from './actions';
import { selectShapes, selectContent } from './selectors';

function selectState(state) {

  return {
    shapes  : selectShapes(state),
    content : selectContent(state),
  };
}

function* diagramStore() {

  yield takeEvery(diagramActions.DIAGRAM_STORE, function* () {
    const { shapes, content } = yield select(selectState);
    yield call(LocalStorageUtils.storeDiagram, shapes, content);
  });
}

function* diagramRestore() {

  yield takeEvery(diagramActions.DIAGRAM_RESTORE, function* () {

    const diagram = yield call(LocalStorageUtils.restoreDiagram);
    const shapes  = diagram ? diagram.shapes  : defaultShapes;
    const content = diagram ? diagram.content : defaultContent;

    yield put(diagramActions.contentSet(content));
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

function* shapeSetAlignment() {

  yield takeEvery(diagramActions.SHAPE_SET_ALIGNMENT, function* ({ payload }) {

    const { id, align } = payload;
    const resShape = { align };

    yield put(diagramActions.shapeUpdate(id, resShape));
    yield put(diagramActions.diagramStore());
  });
}

function* shapeRemove() {

  yield takeEvery(diagramActions.SHAPE_REMOVE, function* ({ payload }) {

    const { id } = payload;
    const { shapes, content } = yield select(selectState);

    const resShapes   = cloneDeep(shapes);
    const resContent = cloneDeep(content);

    unset(resShapes, id);
    unset(resContent, id);

    yield put(diagramActions.shapesSet(resShapes));
    yield put(diagramActions.contentSet(resContent));
    yield put(diagramActions.diagramStore());
  });
}

export default function* diagramSaga() {
  yield all([
    fork(diagramStore),
    fork(diagramRestore),
    fork(shapeSetColor),
    fork(shapeSetAlignment),
    fork(shapeRemove),
  ]);
}
