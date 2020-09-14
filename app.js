// Selectors 
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const selectFilter = document.querySelector('.filter-todo');



// Event Listeners 
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
selectFilter.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);
// input.addEventListener(onchange, )

// Functions
function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();
  // Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  const newTodo = document.createElement('li');
  if (todoInput.value === "") {
    alert('You must type a task')
  } else {
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo); 
  saveLocalTodos(todoInput.value)
  // Completed Btn
  const completedBtn = document.createElement('button')
  completedBtn.innerHTML = '<i class="fas fa-check"></i>'
  completedBtn.classList.add('complete-btn')
  todoDiv.appendChild(completedBtn);
  // Delete Btn
  const deleteBtn = document.createElement('button')
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
  deleteBtn.classList.add('delete-btn')
  todoDiv.appendChild(deleteBtn);
  // Append item to list:
  todoList.appendChild(todoDiv); 
  todoInput.value = '';
  };
}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    todo.remove();
    removeLocatTodos(todo);
  }

  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch(e.target.value) {
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if(todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        };
        break;
      case "uncompleted":
        if(!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  })
}

function saveLocalTodos(todo) {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li'); 
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); 
    // Completed Btn
    const completedBtn = document.createElement('button')
    completedBtn.innerHTML = '<i class="fas fa-check"></i>'
    completedBtn.classList.add('complete-btn')
    todoDiv.appendChild(completedBtn);
    // Delete Btn
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
    deleteBtn.classList.add('delete-btn')
    todoDiv.appendChild(deleteBtn);
    // Append item to list:
    todoList.appendChild(todoDiv); 
  })
} 

function removeLocatTodos(todo) {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}