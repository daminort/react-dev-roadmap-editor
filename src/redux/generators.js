import { put, select } from 'redux-saga/effects';

import MathUtils from '../utils/MathUtils';
import DiagramUtils from '../utils/DiagramUtils';

import diagramActions from './diagram/actions';
import { selectShapes, selectCurves } from './diagram/selectors';

// let timeoutRef = null;

function selectState(state) {

  return {
    shapes : selectShapes(state),
    curves : selectCurves(state),
  };
}

export function* rebuildTouchedCurves(activeShapeID) {
  const { shapes, curves } = yield select(selectState);
  const touchedCurves = curves.filter(curve => {
    return (curve.startID === activeShapeID || curve.endID === activeShapeID);
  });
  if (touchedCurves.length === 0) {
    return;
  }

  for (let i = 0; i < touchedCurves.length; i++) {
    const curve      = touchedCurves[i];
    const startShape = shapes[curve.startID];
    const endShape   = shapes[curve.endID];

    const { start, end } = MathUtils.calculateCurve(startShape, endShape);
    const resCurve = DiagramUtils.updateCurve(curve, start, end);

    yield put(diagramActions.shapeSet(resCurve.id, resCurve));
  }
}

/*
export function* sleep(time) {
  yield new Promise(resolve => {
    timeoutRef = setTimeout(resolve, time);
  });
}

function* clearSleep() {
  yield new Promise(resolve => {
    clearTimeout(timeoutRef);
    resolve();
  });
}
*/
