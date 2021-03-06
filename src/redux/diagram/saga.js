import { all, takeLatest, put, call, select } from 'redux-saga/effects';

import { TYPES, STORAGE_NAMES } from '../../constants/common';
import { SIZE } from '../../constants/editor';
import { defaultPage } from '../../constants/editor';

import MathUtils from '../../utils/MathUtils';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import DOMUtils from '../../utils/DOMUtils';
import { cloneDeep, unset } from '../../utils/lodash';

import appActions from '../app/actions';
import diagramActions from './actions';
import { rebuildTouchedCurves, readUploadedFile } from '../generators';
import { selectShapes, selectContent, selectShape } from './selectors';

function selectState(state) {
  const { App } = state;
  const { activeShapeID, page } = App;

  return {
    activeShapeID,
    page,
    activeShape : selectShape(activeShapeID)(state),
    shapes      : selectShapes(state),
    content     : selectContent(state),
  };
}

// Diagram -----------------------------------------------------------------------------------------
function* diagramStore() {
  const { shapes, content, page } = yield select(selectState);
  yield call(LocalStorageUtils.storeDiagram, shapes, content, page);
}

function* diagramRestore() {

  const diagram = yield call(LocalStorageUtils.restoreDiagram);
  const shapes  = diagram ? diagram.shapes  : {};
  const content = diagram ? diagram.content : {};
  const page    = diagram ? diagram.page    : defaultPage;

  yield put(appActions.pageDataSet(page));
  yield put(diagramActions.contentSet(content));
  yield put(diagramActions.shapesSet(shapes));
}

function* diagramDownload() {
  const { shapes, content, page } = yield select(selectState);
  const data = {
    [STORAGE_NAMES.shapes]  : shapes,
    [STORAGE_NAMES.content] : content,
    [STORAGE_NAMES.page]    : page,
  };

  yield put(diagramActions.downloadDataUpdate(data));
}

function* diagramReset() {
  yield put(appActions.activeShapeIDSet(''));
  yield put(diagramActions.contentSet({}));
  yield put(diagramActions.shapesSet({}));
}

// Start / Finish operations -----------------------------------------------------------------------
function* downloadStart() {
  yield call(DOMUtils.clickDownloadLink);
}

function* uploadFileSelect() {
  yield call(DOMUtils.clickUploadInput);
}

function* uploadStart({ payload }) {
  const { file } = payload;
  if (!file) {
    return;
  }
  try {
    const data    = yield call(readUploadedFile, file);
    const shapes  = data[STORAGE_NAMES.shapes];
    const content = data[STORAGE_NAMES.content];
    const page    = data[STORAGE_NAMES.page];

    yield put(appActions.pageDataSet(page));
    yield put(diagramActions.contentSet(content));
    yield put(diagramActions.shapesSet(shapes));
    
  } catch (e) {
    console.error(e);
  }
}

// Shapes ------------------------------------------------------------------------------------------
function* shapeSetColor({ payload }) {

  const { id, color } = payload;
  const resShape = {
    bg: color,
  };

  yield put(diagramActions.shapeUpdate(id, resShape));
}

function* shapeSetAlignment({ payload }) {

  const { id, align } = payload;
  const resShape = { align };

  yield put(diagramActions.shapeUpdate(id, resShape));
}

function* shapeSetDashed({ payload }) {

  const { id, dashed } = payload;
  const resShape = { dashed };

  yield put(diagramActions.shapeUpdate(id, resShape));
}

function* shapeSetNoBorder({ payload }) {

  const { id, noBorder } = payload;
  const resShape = { noBorder };

  yield put(diagramActions.shapeUpdate(id, resShape));
}

function* shapeSetTextBold({ payload }) {

  const { id } = payload;
  const { activeShape } = yield select(selectState);

  const resShape = {
    textBold: !activeShape.textBold,
  };

  yield put(diagramActions.shapeUpdate(id, resShape));
}

function* shapeSetTextSize({ payload }) {

  const { id } = payload;
  const { activeShape } = yield select(selectState);
  const { textSize } = activeShape;

  let resTextSize = SIZE.md;
  if (textSize === SIZE.md) { resTextSize = SIZE.sm; }
  if (textSize === SIZE.sm) { resTextSize = SIZE.lg; }
  if (textSize === SIZE.lg) { resTextSize = SIZE.md; }

  const resShape = { textSize: resTextSize };

  yield put(diagramActions.shapeUpdate(id, resShape));
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
  yield put(appActions.activeShapeIDSet(''));
}

function* shapeMove({ payload }) {
  const { id, movementX, movementY } = payload;
  const { activeShape } = yield select(selectState);

  const newPosition = MathUtils.calculateMoving(activeShape, movementX, movementY);
  yield put(diagramActions.shapeUpdate(id, newPosition));

  if (activeShape.type !== TYPES.curve) {
    yield call(rebuildTouchedCurves, id);
  }
}

function* shapeResize({ payload }) {
  const { id, movementX, movementY, controlID } = payload;
  const { activeShape } = yield select(selectState);

  const newPosition = MathUtils.calculateResize(activeShape, movementX, movementY, controlID);
  yield put(diagramActions.shapeUpdate(id, newPosition));

  if (activeShape.type === TYPES.box) {
    yield call(rebuildTouchedCurves, id);
  }
}

export default function* diagramSaga() {
  yield all([
    takeLatest(diagramActions.DIAGRAM_STORE, diagramStore),
    takeLatest(diagramActions.DIAGRAM_RESTORE, diagramRestore),
    takeLatest(diagramActions.DIAGRAM_DOWNLOAD, diagramDownload),
    takeLatest(diagramActions.DIAGRAM_RESET, diagramReset),

    takeLatest(diagramActions.DOWNLOAD_START, downloadStart),
    takeLatest(diagramActions.UPLOAD_FILE_SELECT, uploadFileSelect),
    takeLatest(diagramActions.UPLOAD_START, uploadStart),

    takeLatest(diagramActions.SHAPE_SET_COLOR, shapeSetColor),
    takeLatest(diagramActions.SHAPE_SET_ALIGNMENT, shapeSetAlignment),
    takeLatest(diagramActions.SHAPE_SET_DASHED, shapeSetDashed),
    takeLatest(diagramActions.SHAPE_SET_NO_BORDER, shapeSetNoBorder),
    takeLatest(diagramActions.SHAPE_SET_TEXT_BOLD, shapeSetTextBold),
    takeLatest(diagramActions.SHAPE_SET_TEXT_SIZE, shapeSetTextSize),

    takeLatest(diagramActions.SHAPE_REMOVE, shapeRemove),
    takeLatest(diagramActions.SHAPE_MOVE, shapeMove),
    takeLatest(diagramActions.SHAPE_RESIZE, shapeResize),
  ]);
}
