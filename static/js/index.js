import TodoItem from './classes/TodoItem.js';
import Form from './classes/Form.js';

const form = new Form().render();

const ul = document.getElementById('defaultTable');

// Preventing default behaviour of the form
form.addEventListener('submit', (e) => {
    e.preventDefault();
});

const input = document.getElementById('newItem');
const addTaskButton = document.getElementById('addTaskButton');

// Handling click on button to add new task
addTaskButton.addEventListener('click', handleAddTaskButton);

// Handling pressing enter
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleAddTaskButton();
    }
});

// Initial loading items from local storage
window.addEventListener('load', () => {
    const items = TodoItem.getFromLocalStorage();

    if (items) {
        items.forEach((item) => {
            ul.appendChild(item);
        });
    }
});

function handleAddTaskButton() {
    if (input.value === '' || !input.value) {
        return;
    }

    const newTask = new TodoItem({ text: input.value }).getItem();
    ul.appendChild(newTask);

    input.value = '';
}
