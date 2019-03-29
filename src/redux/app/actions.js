import { makeActionCreator } from '../utils';

const prefix = 'App:';
const TYPES = {
  LOADING_SET: `${prefix}loadingSet`,
};

const actions = {
  ...TYPES,
  loadingSet: makeActionCreator(TYPES.LOADING_SET, 'loading'),
};

export default actions;
