import { THEME } from '../constants/theme';
import { TYPES } from '../constants/common';
import { ALIGN } from '../constants/editor';

const { bg } = THEME;

export const shapes = {
  legends: {
    id       : 'legends',
    type     : TYPES.box,
    x        : 600,
    y        : 60,
    width    : 160,
    height   : 30,
    bg       : bg.transparent,
    align    : ALIGN.right,
    noBorder : true,
  },
  legendMustKnow: {
    id       : 'legendMustKnow',
    type     : TYPES.box,
    x        : 600,
    y        : 100,
    width    : 160,
    height   : 30,
    bg       : bg.yellow,
    align    : ALIGN.center,
    noBorder : false,
  },
  legendGoodKnow: {
    id       : 'legendGoodKnow',
    type     : TYPES.box,
    x        : 600,
    y        : 140,
    width    : 160,
    height   : 30,
    bg       : bg.red,
    align    : ALIGN.center,
    noBorder : false,
  },
  legendPossibilities: {
    id       : 'legendPossibilities',
    type     : TYPES.box,
    x        : 600,
    y        : 180,
    width    : 160,
    height   : 30,
    bg       : bg.grey,
    align    : ALIGN.center,
    noBorder : false,
  },
};
