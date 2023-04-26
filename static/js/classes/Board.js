import { v4 as uuidv4 } from 'uuid';

class Board {
    static boards = [];

    name;
    tasks;
    element;

    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.element = this.createElement(name);

        Board.boards.push(this.element);
        return this.element;
    }

    static getBoardByName(name) {
        // Validate name of the board to not contain the symbols below
        return Board.boards.find((item) => {
            return item.id.slice(0, item.id.indexOf('&')) === name;
        });
    }

    createElement(name) {
        const ul = document.createElement('ul');
        const h2 = document.createElement('h2');
        h2.textContent = name;
        ul.appendChild(h2);
        ul.id = `${name}&board`;

        this.element = ul;
        this._attachDragDropEventListeners();

        return ul;
    }

    _attachDragDropEventListeners() {}

    addTask(task) {
        if (task) {
            this.tasks.push(task);
        }
    }

    removeTask(task) {
        if (task) {
            this.tasks = this.tasks.filter((item) => item.id !== task.id);
        }
    }
}

export default Board;
