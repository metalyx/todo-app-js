class Form {
    inputText = '';
    form = null;
    // `<form id="form-add-new-item">
    // <label for="newItem">New item</label>
    // <input id="newItem" type="text" />
    // <button class="btn-secondary" type="button" id="addTaskButton">Add task</button>
    // </form>`
    constructor() {
        const form = document.createElement('form');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const button = document.createElement('button');

        form.id = 'form-add-new-item';
        label.htmlFor = 'newItem';
        label.textContent = 'New item';
        input.id = 'newItem';
        input.setAttribute('type', 'text');
        button.className = 'btn-secondary';
        button.setAttribute('type', 'button');
        button.id = 'addTaskButton';
        button.textContent = 'Add Task';

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(button);

        this.form = form;
    }

    render() {
        const formContainer = document.getElementById('formContainer');

        if (formContainer) {
            formContainer.appendChild(this.form);

            return this.form;
        } else {
            throw new Error('formContainer element was not found....');
        }
    }
}

export default Form;
