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
        let data = this._getParsedFromLocalStorage();

        // If there is data in local storage
        if (data && data.length > 0) {
            // If there is such item, we just change the fields of it
            if (data.find((item) => item.id == object.id)) {
                data = data.map((item) => {
                    if (item.id != object.id) {
                        return item;
                    } else {
                        const { id, text, isCompleted } = object;

                        if (
                            id === undefined ||
                            (text === undefined && isCompleted === undefined)
                        ) {
                            throw new Error(
                                'Unexpected object came in insert method of LocalStorage class'
                            );
                        } else {
                            const editedItem = {
                                id,
                                text,
                                isCompleted,
                            };

                            return editedItem;
                        }
                    }
                });

                window.localStorage.setItem(this.key, JSON.stringify(data));
                // If no such object, just push as new one
            } else {
                window.localStorage.setItem(
                    this.key,
                    JSON.stringify([...data, object])
                );
            }
            // If there is no data, set as array with one element - the object
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
