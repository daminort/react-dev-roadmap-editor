import { createSelector } from 'reselect';

const app    = (state) => state.App;
const page   = (state) => state.App.page;
const resize = (state) => state.App.resize;
const create = (state) => state.App.create;

// App --------------------------------------------------------------------------------------------
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

// Resize -----------------------------------------------------------------------------------------
export const selectResizeData = createSelector(
  [resize],
  (resize) => resize,
);

export const selectIsResize = createSelector(
  [selectResizeData],
  (resize) => Boolean(resize.shapeID),
);

// Page -------------------------------------------------------------------------------------------
export const selectPageData = createSelector(
  [page],
  (page) => page,
);

// Create -----------------------------------------------------------------------------------------
export const selectCreateData = createSelector(
  [create],
  (create) => create,
);

export const selectIsCreate = createSelector(
  [selectCreateData],
  (create) => Boolean(create.shapeType),
);
