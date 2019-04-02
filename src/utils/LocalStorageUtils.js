import { STORAGE_NAMES } from '../constants/common';

class LocalStorageUtils {

  // Common -------------------------------------------------------------------
  storeValue = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  restoreValue = (key, defaultValue = null) => {
    try {
      const rawValue = localStorage.getItem(key);
      if (!rawValue) {
        return defaultValue;
      }

      return JSON.parse(rawValue);

    } catch (error) {
      return defaultValue;
    }
  }

  clearValue = (key) => {
    localStorage.removeItem(key);
  }

  // Custom -------------------------------------------------------------------
  storeDiagram = (diagram) => {
    this.storeValue(STORAGE_NAMES.diargam, diagram);
  }

  restoreDiagram = () => {
    return this.restoreValue(STORAGE_NAMES.diargam);
  }
}

export default new LocalStorageUtils();
