class LocalStorage {
    constructor(key) {
        if (!key) {
            throw new Error('Key must be provided.');
        }

        this.key = key;
    }

    _getParsedFromLocalStorage() {
        if (!window) {
            throw new Error('No window object...');
        }

        const data = window.localStorage.getItem(this.key);

        if (data) {
            return JSON.parse(data);
        } else {
            return null;
        }
    }

    insert(object) {
        const data = this._getParsedFromLocalStorage();

        if (data) {
            data.push(object);

            window.localStorage.setItem(this.key, JSON.stringify(data));
        } else {
            window.localStorage.setItem(this.key, JSON.stringify([object]));
        }
    }

    delete(id) {
        const data = this._getParsedFromLocalStorage();

        if (data) {
            let filtered = data.filter((item) => item.id != id);

            window.localStorage.setItem(this.key, JSON.stringify(filtered));
        } else {
            console.warn('No data in localStorage was found...');
        }
    }

    getById(id) {
        const data = this._getParsedFromLocalStorage();

        return data.find((item) => item.id == id);
    }

    getAll() {
        return this._getParsedFromLocalStorage();
    }
}

export default LocalStorage;
