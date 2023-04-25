'use strict';
import LocalStorage from './LocalStorage.js';
import { v4 as uuidv4 } from 'uuid';

class TodoItem {
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

    static getFromLocalStorage() {
        const LS = new LocalStorage('todoItems');
        const localStorageData = LS.getAll();

        if (Array.isArray(localStorageData)) {
            const arrayOfTodoLis = [];

            localStorageData.forEach((item) => {
                const toBePushed = new TodoItem(item).getItem();
                arrayOfTodoLis.push(toBePushed);
            });

            return arrayOfTodoLis;
        } else {
            return null;
        }
    }

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

    _createItem() {
        const li = this.createLi(this.id);

        const div = document.createElement('div');
        div.className = 'flex';

        const input = document.createElement('input');
        input.id = `todo-input-${this.id}`;
        input.setAttribute('type', 'checkbox');
        input.checked = this.isCompleted;

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

        this.setText(this.text);
    }

    constructor(props) {
        const { id, text, isCompleted } = props;

        if (!id) {
            this.id = uuidv4();
        } else {
            this.id = id;
        }

        if (text === '' || !text) {
            this.text = 'No task description provided';
        } else {
            this.text = text;
        }

        if (isCompleted === undefined) {
            this.isCompleted = false;
        } else {
            this.isCompleted = isCompleted;
        }

        this._createItem();
    }

    getItem() {
        if (!this.li) {
            throw new Error('TodoItem was not defined');
        }

        return this.li;
    }

    _setLocalStorage() {
        if (window) {
            const todoItem = {
                text: this.text,
                isCompleted: this.isCompleted,
                id: this.id,
            };

            const LS = new LocalStorage('todoItems');
            LS.insert(todoItem);
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
