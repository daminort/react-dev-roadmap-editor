import { cloneDeep, keys } from './lodash';

class CommonUtils {

  safeMerge = (target = {}, source = {}, createKeys = false) => {
    const targetKeys = keys(target);
    const sourceKeys = keys(source);
    const result     = cloneDeep(target);

    sourceKeys.forEach(key => {
      if (!targetKeys.includes(key) && !createKeys) {
        return;
      }

      result[key] = source[key];
    });

    return result;
  }
}

export default new CommonUtils();
