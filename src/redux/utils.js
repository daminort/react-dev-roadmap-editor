import { get, keys } from '../utils/lodash';
import { store } from './store';

export function makeActionCreator(type, ...argNames) {

  return function creator(...args) {
    const action  = { type };
    const payload = {};
    let isPayload = false;

    argNames.forEach((arg, index) => {
      const key    = argNames[index];
      const value  = args[index];
      payload[key] = value;
      isPayload    = true;
    });

    if (isPayload) {
      action.payload = payload;
    }

    return action;
  };
}

export function select(path = null) {
  if (!path) {
    return store;
  }

  return get(store, path);
}

export function getShapesCount() {
  const shapes = select('Diagram');
  return keys(shapes).length;
}
