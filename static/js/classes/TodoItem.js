class TodoItem {
    //
    static LAST_TODOITEM_ID_POSTFIX = 0;

    // a unique identifier for each item
    id;
    // the text content of the item
    text;
    // a boolean value indicating whether the item has been completed
    isCompleted;
    // a reference to the DOM element for the item
    li;
    input;
    label;
    button;

    createLi(id) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.id = `todo-item-${id}`;

        li.addEventListener('click', (e) => {
            if (e.target instanceof HTMLLIElement) {
                this.clickHandle();
            }
        });

        this.li = li;

        return li;
    }

    constructor(text) {
        TodoItem.LAST_TODOITEM_ID_POSTFIX += 1;

        this.id = TodoItem.LAST_TODOITEM_ID_POSTFIX;
        this.text = '';

        this.isCompleted = false;

        const li = this.createLi(this.id);

        const div = document.createElement('div');
        div.className = 'flex';

        const input = document.createElement('input');
        input.id = `todo-input-${this.id}`;
        input.setAttribute('type', 'checkbox');

        this.input = input;

        const label = document.createElement('label');
        label.htmlFor = `todo-input-${this.id}`;
        label.textContent = `${this.text}`;

        this.label = label;

        div.appendChild(input);
        div.appendChild(label);

        const button = document.createElement('button');
        button.id = `todo-deleteButton-${this.id}`;
        button.textContent = 'Delete';
        button.className = 'btn-danger';

        button.addEventListener('click', this.removeItem);

        this.button = button;

        li.appendChild(div);
        li.appendChild(button);

        this.setText(text);
    }

    // In development...
    _createFromLocalStorage() {
        const todoItemsLocalStorage = window.localStorage.getItem('todoItems');

        if (!todoItemsLocalStorage) {
            return null;
        }

        const parsedItems = JSON.parse(todoItemsLocalStorage);

        const maxId = 0;
        parsedItems.forEach((element) => {
            const { id, text, isCompleted } = element;

            if (maxId < id) {
                maxId = id;
            }
        });
    }

    getItem() {
        return this.li;
    }

    _setLocalStorage() {
        if (window) {
            const todoItem = {
                text: this.text,
                isCompleted: this.isCompleted,
                id: this.id,
            };

            const todoItemsLocalStorage =
                window.localStorage.getItem('todoItems');
            if (todoItemsLocalStorage) {
                const parsedItems = JSON.parse(todoItemsLocalStorage);

                if (parsedItems.find((item) => item.id == this.id)) {
                    const newItems = parsedItems.map((element) => {
                        console.log(element);
                        if (element.id != this.id) {
                            return element;
                        } else {
                            return todoItem;
                        }
                    });

                    window.localStorage.setItem(
                        'todoItems',
                        JSON.stringify(newItems)
                    );
                } else {
                    window.localStorage.setItem(
                        'todoItems',
                        JSON.stringify([...parsedItems, todoItem])
                    );
                }
            } else {
                window.localStorage.setItem(
                    'todoItems',
                    JSON.stringify([todoItem])
                );
            }
        }
    }

    setText(textString) {
        if (this.text !== this.textString) {
            this.text = textString;

            this.label.textContent = this.text;

            this._setLocalStorage();
        }
    }

    clickHandle = () => {
        this.isCompleted = !this.isCompleted;
        this.input.checked = this.isCompleted;
        this._setLocalStorage();
    };

    removeItem = () => {
        const todoItemsLocalStorage = window.localStorage.getItem('todoItems');

        if (todoItemsLocalStorage) {
            const parsedItems = JSON.parse(todoItemsLocalStorage);

            const newItems = parsedItems.filter((item) => item.id != this.id);

            window.localStorage.setItem('todoItems', JSON.stringify(newItems));
        }

        this.li.remove();

        delete this;
    };

    // a method that creates a new DOM element for the item, including a checkbox, label, and delete button
    createMarkup() {}
}

export default TodoItem;