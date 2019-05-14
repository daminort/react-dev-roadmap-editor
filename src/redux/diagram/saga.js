import { all, takeEvery, put, call, select } from 'redux-saga/effects';

import {
  shapes as defaultShapes,
  content as defaultContent,
} from '../../resources';

import LocalStorageUtils from '../../utils/LocalStorageUtils';
import { cloneDeep, unset } from '../../utils/lodash';

import appActions from '../app/actions';
import diagramActions from './actions';
import { selectShapes, selectContent } from './selectors';

function selectState(state) {

  return {
    shapes  : selectShapes(state),
    content : selectContent(state),
  };
}

function* diagramStore() {
  const { shapes, content } = yield select(selectState);
  yield call(LocalStorageUtils.storeDiagram, shapes, content);
}

function* diagramRestore() {

  const diagram = yield call(LocalStorageUtils.restoreDiagram);
  const shapes  = diagram ? diagram.shapes  : defaultShapes;
  const content = diagram ? diagram.content : defaultContent;

  yield put(diagramActions.contentSet(content));
  yield put(diagramActions.shapesSet(shapes));
}

function* shapeSetColor({ payload }) {

  const { id, color } = payload;
  const resShape = {
    bg: color,
  };

  yield put(diagramActions.shapeUpdate(id, resShape));
  yield put(diagramActions.diagramStore());
}

function* shapeSetAlignment({ payload }) {

  const { id, align } = payload;
  const resShape = { align };

  yield put(diagramActions.shapeUpdate(id, resShape));
  yield put(diagramActions.diagramStore());
}

function* shapeRemove({ payload }) {

  const { id } = payload;
  const { shapes, content } = yield select(selectState);

  const resShapes  = cloneDeep(shapes);
  const resContent = cloneDeep(content);

  unset(resShapes, id);
  unset(resContent, id);

  yield put(diagramActions.shapesSet(resShapes));
  yield put(diagramActions.contentSet(resContent));
  yield put(diagramActions.diagramStore());
  yield put(appActions.activeShapeIDSet(''));
}

export default function* diagramSaga() {
  yield all([
    takeEvery(diagramActions.DIAGRAM_STORE, diagramStore),
    takeEvery(diagramActions.DIAGRAM_RESTORE, diagramRestore),
    takeEvery(diagramActions.SHAPE_SET_COLOR, shapeSetColor),
    takeEvery(diagramActions.SHAPE_SET_ALIGNMENT, shapeSetAlignment),
    takeEvery(diagramActions.SHAPE_REMOVE, shapeRemove),
  ]);
}
