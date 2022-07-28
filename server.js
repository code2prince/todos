const { response } = require('express');
const express = require('express');
const path = require('path');
//const { send } = require('process');

const app = express();

app.use(express.json());



app.use(express.static(path.join(__dirname, 'client')))
    .get('/', (request, response) => response.render('index.html'));


/*
    // this is the todo which will be pushed to todoList array
    const todo = {
        id: 1,
        todoName: 'get the bus ticket',
        completed: false,
    }

    // req body from clieint side
    const todo = {
        name: 'get hericut tomorrow',
    }


*/
let todoList = [];

app.get('/todos', function(request, response) {
    response.send(todoList);
});

app.post('/addTodo', function(request, response) {
    const todo = request.body;
    const todoWithId = {
        name: todo.name,
        id: todoList.length +1,
        completed: false,
    }    
    todoList.push(todoWithId);

    response.send({added: true, msg: 'Todo added to list'});
});

app.put('/updateTodo', function(request, response) {
    const todo = request.body;

    
    const newList = todoList.map(t => {
        if(t.id === parseInt(todo.id)) {
            return {
                ...t,
                completed: true,
            }
        } else {
            return t;
        }
    });
    todoList = newList;

    response.send({todoList: todoList, msg: 'done'});
});



app.delete('/deleteTodo', function(request, response) {
    const todo = request.body;
    
    const newList = todoList.filter(t => t.id !== parseInt(todo.id));
    todoList = newList;

    response.send({todoList: todoList, msg: 'deleted'});
});


app.listen(5000, function () {
    console.log('Server is running on port 5000')
});


