import { createSelector } from 'reselect';

const app    = (state) => state.App;
const resize = (state) => state.App.resize;

export const selectApp = createSelector(
  [app],
  (app) => app,
);

export const selectLoading = createSelector(
  [selectApp],
  (app) => app.loading,
);

export const selectActiveShapeID = createSelector(
  [selectApp],
  (app) => app.activeShapeID,
);

export const selectResizeData = createSelector(
  [resize],
  (resize) => resize,
);

export const selectIsResize = createSelector(
  [selectResizeData],
  (resize) => Boolean(resize.shapeID),
);
