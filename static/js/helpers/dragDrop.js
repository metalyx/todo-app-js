export const dragOver = (e) => {
    e.preventDefault();

    if (e.target.className === 'todo-item') {
        e.target.style.boxShadow = '0 4px 3px gray';
    }
};

export const dragStart = (e, item) => {
    console.log(item);
};

export const dragEnd = (e) => {
    e.target.style.boxShadow = 'none';
};

export const dragLeave = (e) => {
    e.target.style.boxShadow = 'none';
};

export const onDrop = (e) => {
    e.target.style.boxShadow = 'none';
};
