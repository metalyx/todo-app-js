class Form {
    inputText = '';
    form = null;
    type;

    constructor(type = 'todoItem') {
        this.type = type;

        const form = document.createElement('form');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const button = document.createElement('button');

        switch (type) {
            case 'todoItem':
                //   <select id="cars">
                //     <option value="volvo">Volvo</option>
                //     <option value="saab">Saab</option>
                //     <option value="vw">VW</option>
                //     <option value="audi" selected>Audi</option>
                //   </select>

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
                break;
            case 'board':
                form.id = 'form-add-new-board';
                label.htmlFor = 'newBoard';
                label.textContent = 'New Board';
                input.id = 'newBoard';
                input.setAttribute('type', 'text');
                button.className = 'btn-secondary';
                button.setAttribute('type', 'button');
                button.id = 'addBoardButton';
                button.textContent = 'Add Board';

                form.appendChild(label);
                form.appendChild(input);
                form.appendChild(button);

                this.form = form;
                break;
        }
    }

    render() {
        switch (this.type) {
            case 'todoItem':
                const formContainer = document.getElementById('formContainer');

                if (formContainer) {
                    formContainer.appendChild(this.form);

                    return this.form;
                } else {
                    throw new Error('formContainer element was not found....');
                }
                break;
            case 'board':
                const formBoardContainer =
                    document.getElementById('formBoardContainer');

                if (formBoardContainer) {
                    formBoardContainer.appendChild(this.form);

                    return this.form;
                } else {
                    throw new Error(
                        'formBoardContainer element was not found....'
                    );
                }
        }
    }
}

export default Form;
