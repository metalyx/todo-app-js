import TodoItem from './classes/TodoItem.js';
import Form from './classes/Form.js';

const form = new Form().render();

const ul = document.getElementById('ul-1');

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

const input = document.getElementById('newItem');
const addTaskButton = document.getElementById('addTaskButton');

addTaskButton.addEventListener('click', () => {
    const newTask = new TodoItem(input.value).getItem();
    ul.appendChild(newTask);

    input.value = '';
});
