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
  storeDiagram = (shapes, content) => {
    this.storeValue(STORAGE_NAMES.shapes, shapes);
    this.storeValue(STORAGE_NAMES.content, content);
  }

  restoreDiagram = () => {
    const shapes = this.restoreValue(STORAGE_NAMES.shapes);
    if (!shapes) {
      return null;
    }
    const content = this.restoreValue(STORAGE_NAMES.content);

    return {
      shapes,
      content,
    };
  }
}

export default new LocalStorageUtils();
