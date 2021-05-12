export const localStorageCapacity = 5242880; // byte
export const sessionStorageCapacity = 5242880; // byte

function getStorageSize(storage) {
    return new Blob(Object.values(storage)).size
}

class StorageHelper {
    constructor(storage, capacity) {
        this.storage = storage;
        this.capacity = capacity;
    }

    capacity = () => {
        if (this.storage === localStorage)
            return localStorageCapacity;
        if (this.storage === sessionStorageCapacity)
            return sessionStorageCapacity;
        return -1;
    }

    size = () => getStorageSize(this.storage);

    getItem = (key) => {
        const stored = this.storage.getItem(key);
        if (stored == null)
            return undefined;
        try {
            return JSON.parse(stored);
        } catch (err) {
            return stored;
        }
    }

    keys = () => Object.keys(this.storage);

    store = (key, value) => {
        this.storage.setItem(key, JSON.stringify(value));
    }

    modify = (key, fn) => {
        this.store(key, fn(this.getItem(key)));
    }

    appendItemToArray = (item, storageId) => {
        this.modify(storageId, (data = []) => [...data, item]);
    }

    removeItemFromArray = (item, storageId) => {
        this.modify(storageId, (data = []) => data.filter(s => s !== item));
    }

    saveItemToObject = (item, storageId) => {
        this.modify(storageId, (data = {}) => ({ ...data, item }));
    }

    space = () => this.capacity() - this.size();

    removeItem = (key) => this.storage.removeItem(key);
}

export const myLocalStorage = new StorageHelper(localStorage, localStorageCapacity);
export const mySessionStorage = new StorageHelper(sessionStorage, sessionStorageCapacity);