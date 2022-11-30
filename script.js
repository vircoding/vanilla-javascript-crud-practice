const template = document.getElementById('template').content;
const todoSection = document.getElementById('todoSection');
const alert = document.getElementById('emptyTodo');

let todoList = [];

const insertTodo = () => {
    const form = new FormData(document.getElementById('form'));
    const [todo] = [...form.values()];
    if (!todo.trim()) {
        alert.classList.remove('d-none');
        return;
    }
    todoList.push({ name: todo.trim(), id: Date.now() });
    localStorage.setItem('todoList', JSON.stringify(todoList));
};

const showTodo = () => {
    const fragment = document.createDocumentFragment();
    todoSection.textContent = '';
    todoList.forEach((item) => {
        const clone = template.cloneNode(true);
        clone.querySelector('article').dataset.id = `${item.id}`;
        clone.querySelector('p').textContent = item.name;
        fragment.appendChild(clone);
    });
    todoSection.appendChild(fragment);
};

const deleteTodo = (id) => {
    todoList = todoList.filter((item) => item.id !== id);
    localStorage.setItem('todoList', JSON.stringify(todoList));
};

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('todoList')) {
        todoList = JSON.parse(localStorage.getItem('todoList'));
    }
    showTodo();
});

document.addEventListener('click', (e) => {
    if (e.target.matches('button.btn-primary')) {
        e.preventDefault();
        alert.classList.add('d-none');
        insertTodo();
        document.querySelector('#form input').value = '';
        showTodo();
    }

    if (e.target.matches('button.btn-danger')) {
        e.preventDefault();
        deleteTodo(parseInt(e.target.parentNode.dataset.id));
        showTodo();
    }
});
