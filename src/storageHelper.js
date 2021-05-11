export const localStorageCapacity = 5242880; // byte
export const sessionStorageCapacity = 5242880; // byte

function getStorageSize(storage) {
    return new Blob(Object.values(storage)).size
}

export function makeStorageHelper(storage) {
    const capacity = () => {
        if (storage === localStorage)
            return localStorageCapacity;
        if (storage === sessionStorageCapacity)
            return sessionStorageCapacity;
        return -1;
    };
    const size = () => getStorageSize(storage);
    return {
        getItem: (key) => {
            const stored = storage.getItem(key);
            if (stored == null)
                return undefined;
            try {
                return JSON.parse(stored);
            } catch (err) {
                return stored;
            }
        },
        keys: () => Object.keys(storage),
        store: (key, value) => {
            storage.setItem(key, JSON.stringify(value));
        },
        modify: (key, fn) => {
            this.store(key, fn(this.load(key)));
        },
        appendItemToArray: (item, storageID) => {
            this.modify(storageID, (data = []) => [...data, item]);
        },
        removeItemFromArray: (item, storageID) => {
            this.modify(storageID, (data = []) => data.filter(s => s !== item));
        },
        saveItemToObject: (item, storageID) => {
            this.modify(storageID, (data = {}) => ({ ...data, item }));
        },
        capacity,
        size,
        space: () => capacity() - size(),
        removeItem: (key) => storage.removeItem(key),
    };
};

export const myLocalStorage = makeStorageHelper(localStorage, localStorageCapacity);
export const mySessionStorage = makeStorageHelper(sessionStorage, sessionStorageCapacity);