import { THEME } from '../constants/theme';
import { TYPES } from '../constants/common';

const { bg } = THEME;

export const diagram = {
  legendMustKnow: {
    type: TYPES.box,
    x: 120,
    y: 80,
    width: 160,
    height: 30,
    bg: bg.yellow,
  },
  legendGoodKnow: {
    type: TYPES.box,
    x: 300,
    y: 80,
    width: 160,
    height: 30,
    bg: bg.red,
  },
  legendPossibilities: {
    type: TYPES.box,
    x: 480,
    y: 80,
    width: 160,
    height: 30,
    bg: bg.grey,
  },
};
