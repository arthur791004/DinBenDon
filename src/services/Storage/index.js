import MemoryStorage from './MemoryStorage';

class Storage {
  storage = typeof window !== 'undefined' && window.localStorage
    ? window.localStorage
    : new MemoryStorage();

  setItem(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getItem(key) {
    try {
      return JSON.parse(this.storage.getItem(key));
    } catch (e) {
      return;
    }
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

export default new Storage();