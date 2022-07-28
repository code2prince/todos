function addTodo(e) {
    const todoName = document.getElementById('todo').value;
    
    const todo = {
        name: todoName,
    }

    const reqObject = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    };

    fetch('http://localhost:5000/addTodo', reqObject)
    .then(response => response.json())
    .then(result => {
        alert(result.msg);
        displayTodo();
    });

}

function displayTodo() {
    fetch('http://localhost:5000/todos')
    .then(response => response.json())
    .then(result => {
        renderTodo(result)
    });
}

function renderTodo(todos) {
    const targetDiv = document.getElementById('todolist');
    targetDiv.innerHTML = '';
    todos.forEach(todo => {

        const todoRow = document.createElement('li');
        todoRow.setAttribute('class', 'list-group-item todo-row-grid');

        const seqNo = document.createElement('div');
        seqNo.innerText = todo.id;
        const todoName = document.createElement('div');
        todoName.setAttribute('data-id', todo.id);
        todoName.innerText = todo.name;
        if(todo.completed === true) {
            todoName.setAttribute('class', 'complete');
        }
        todoName.onclick = completeTodo;
        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'btn btn-danger');
        deleteBtn.setAttribute('data-id', todo.id);
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = deleteTodo;

        todoRow.appendChild(seqNo);
        todoRow.appendChild(todoName);
        todoRow.appendChild(deleteBtn);

        targetDiv.appendChild(todoRow);
    });
}

function completeTodo(e) {
    console.log('completeing ',e.target);
    console.log('dataset ',e.target.dataset);
    console.log('id ',e.target.dataset.id);

    const todo = {
        id: e.target.dataset.id,
    }

    const reqObject = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    };

    fetch('http://localhost:5000/updateTodo', reqObject)
    .then(response => response.json())
    .then(result => {
        alert(result.msg);
        renderTodo(result.todoList);
    });

}


function deleteTodo(e) {
    console.log('deleting ',e.target);
    console.log('dataset ',e.target.dataset);
    console.log('id ',e.target.dataset.id);

    const todo = {
        id: e.target.dataset.id,
    }

    const reqObject = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    };

    fetch('http://localhost:5000/deleteTodo', reqObject)
    .then(response => response.json())
    .then(result => {
        alert(result.msg);
        renderTodo(result.todoList);
    });
}

displayTodo();