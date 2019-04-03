import { createSelector } from 'reselect';

const diagram = (state) => state.Diagram;

export const selectDiagram = createSelector(
  [diagram],
  (diagram) => diagram,
);

export const selectDiagramIDs = createSelector(
  [selectDiagram],
  (diagram) => Object.keys(diagram),
);

export const selectDiagramShape = (id) => {
  return createSelector(
    [selectDiagram],
    (diagram) => diagram[id],
  );
};
