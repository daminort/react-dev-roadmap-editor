import { all } from 'redux-saga/effects';

import appSaga from './app/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
  ]);
}
