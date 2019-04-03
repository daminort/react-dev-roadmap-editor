import { createSelector } from 'reselect';

const shapes = (state) => state.Diagram;

export const selectShapes = createSelector(
  [shapes],
  (shapes) => shapes,
);

export const selectDiagramIDs = createSelector(
  [selectShapes],
  (shapes) => Object.keys(shapes),
);

export const selectDiagramShape = (id) => {
  return createSelector(
    [selectShapes],
    (shapes) => shapes[id],
  );
};
