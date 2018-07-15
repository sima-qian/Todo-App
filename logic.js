var todoFunctions = {
  generateId: (function() {
    var idCounter = 0;

    function incrementCounter() {
      return (idCounter += 1);
    }

    return incrementCounter;
  })(),

  cloneArrayOfObjects: function(todos) {
    return todos.map(function(todo) {
      return JSON.parse(JSON.stringify(todo));
    });
  },

  addTodo: function(todos, newTodo) {
    var newInput = [
      {
        id: todoFunctions.generateId(),
        description: newTodo,
        done: false
      }
    ];
    return newInput.concat(todoFunctions.cloneArrayOfObjects(todos));
  },

  deleteTodo: function(todos, idToDelete) {
    return todos.filter(element => element.id !== idToDelete);
  },

  markTodo: function(todos, idToMark) {
    return todos.map(function(item) {
      if (item.id === idToMark) {
        item.done = item.done ? false : true;
      }
      return item;
    });
  },

  sortTodos: function(todos) {
    return todos
      .filter(item => !item.done)
      .concat(todos.filter(item => item.done));
  },

  editTodo: function(todos, newTodoText, idToEdit) {
    return todos.map(function(item) {
      if (item.id === idToEdit) {
        item.description = newTodoText;
      }
      return item;
    });
  },

  checkTodoTextBlank: function(todos, newTodoText, id) {
    if (!newTodoText) {
      return (newState = todoFunctions.deleteTodo(todos, id));
    } else {
      return (newState = todoFunctions.editTodo(todos, newTodoText, id));
    }
  }
};

// Why is this if statement necessary?
// The answer has something to do with needing to run code both in the browser and in Node.js
// See this article for more details:
// http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
if (typeof module !== "undefined") {
  module.exports = todoFunctions;
}
