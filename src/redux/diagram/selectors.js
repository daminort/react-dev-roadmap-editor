import { createSelector } from 'reselect';

const shapes  = (state) => state.Diagram.shapes;
const content = (state) => state.Diagram.content;

export const selectShapes = createSelector(
  [shapes],
  (shapes) => shapes,
);

export const selectContent = createSelector(
  [content],
  (content) => content,
);

export const selectDiagramIDs = createSelector(
  [selectShapes],
  (shapes) => Object.keys(shapes),
);

export const selectShape = (id) => {
  return createSelector(
    [selectShapes],
    (shapes) => shapes[id],
  );
};

export const selectShapeContent = (id) => {
  return createSelector(
    [selectContent],
    (content) => content[id],
  );
};
