import { all } from 'redux-saga/effects';

import appSaga from './app/saga';
import diagramSaga from './diagram/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    diagramSaga(),
  ]);
}
