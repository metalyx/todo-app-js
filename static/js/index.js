import TodoItem from './classes/TodoItem.js';
import Form from './classes/Form.js';
import Board from './classes/Board.js';

let currentBoard = 'defaultTable';

const form = new Form('todoItem').render();
const formBoard = new Form('board').render();

const ul = document.getElementById('defaultTable');
const boardContainer = document.querySelector('.boardContainer');
const boardSelection = document.getElementById('boardSelection');

const defaultTable = new Board('defaultTable');
boardContainer.appendChild(defaultTable);

// Preventing default behaviour of the form
form.addEventListener('submit', (e) => {
    e.preventDefault();
});
// Preventing default behaviour of the form
formBoard.addEventListener('submit', (e) => {
    e.preventDefault();
});

const input = document.getElementById('newItem');
const inputBoardName = document.getElementById('newBoard');
const addTaskButton = document.getElementById('addTaskButton');
const addBoardButton = document.getElementById('addBoardButton');

// Handling click on button to add new task
addTaskButton.addEventListener('click', handleAddTaskButton);
// Handling click on button to add new task
addBoardButton.addEventListener('click', handleAddBoardButton);

// Handling pressing enter
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleAddTaskButton();
    }
});

// Initial loading items from local storage
window.addEventListener('load', () => {
    const items = TodoItem.getFromLocalStorage();
    const targetTable = Board.getBoardByName(currentBoard);
    console.log(targetTable);
    if (items) {
        items.forEach((item) => {
            targetTable.appendChild(item);
        });
    }
});

function handleAddTaskButton() {
    if (input.value === '' || !input.value) {
        return;
    }

    const newTask = new TodoItem({ text: input.value }).getItem();

    const targetBoard = Board.getBoardByName(currentBoard);
    targetBoard.appendChild(newTask);

    input.value = '';
}

function handleAddBoardButton() {
    if (inputBoardName.value === '' || !inputBoardName.value) {
        return;
    }

    // const newTask = new B({ text: inputBoardName.value }).getItem();
    const newBoard = new Board(inputBoardName.value);
    boardContainer.appendChild(newBoard);

    const option = document.createElement('option');
    option.value = inputBoardName.value;
    option.textContent = inputBoardName.value;
    boardSelection.appendChild(option);

    inputBoardName.value = '';
}

boardSelection.addEventListener('change', (e) => {
    currentBoard = e.target.value;
});
