import { createSelector } from 'reselect';

import { TYPES } from '../../constants/common';
import { values, sortBy } from '../../utils/lodash';

const shapes       = (state) => state.Diagram.shapes;
const content      = (state) => state.Diagram.content;
const downloadData = (state) => state.Diagram.downloadData;

export const selectShapes = createSelector(
  [shapes],
  (shapes) => shapes,
);

export const selectShapesList = createSelector(
  [selectShapes],
  (shapes) => sortBy(values(shapes), 'zIndex'),
);

export const selectContent = createSelector(
  [content],
  (content) => content,
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

export const selectBoxes = createSelector(
  [selectShapesList],
  (shapesList) => shapesList.filter(shape => shape.type === TYPES.box),
);

export const selectCurves = createSelector(
  [selectShapesList],
  (shapesList) => shapesList.filter(shape => shape.type === TYPES.curve),
);

export const selectCircles = createSelector(
  [selectShapesList],
  (shapesList) => shapesList.filter(shape => shape.type === TYPES.circle),
);

export const selectDownloadData = createSelector(
  [downloadData],
  (downloadData) => downloadData,
);
