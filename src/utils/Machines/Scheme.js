import { cloneDeep } from '../lodash';

class SchemePrototype {

  constructor() {
    this.scheme = {
      state: 'idle',
      transitions: {
        'idle': {
          // onClick: function() {...}
        }
      }
    };
  }

  clone() {
    return cloneDeep(this.scheme);
  }
};

export default new SchemePrototype();
