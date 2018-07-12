(function() {
  // DOM node containing todo
  var container = document.getElementById("todo-container");

  var addTodoForm = document.getElementById("add-todo");
  var editTodoItem = document.getElementById("edit"); // needed?

  var state = [
    { id: -3, description: "first todo", done: false },
    { id: -2, description: "second todo", done: false },
    { id: -1, description: "third todo", done: false }
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement("li");
    var editing = false;

    // add marked class if 'done' is true
    if (todo.done) {
      todoNode.classList.add("marked");
    }

    // add markTodo button element
    var markButtonNode = document.createElement("button");
    markButtonNode.classList.add("mark-btn");
    markButtonNode.addEventListener("click", function(event) {
      editing = false;
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(markButtonNode);

    // add span element holding todo description
    var todoSpanNode = document.createElement("span");
    todoSpanNode.textContent = todo.description;

    // event listener for todo editing
    todoSpanNode.addEventListener("click", function(event) {
      editing = true;
      var todoText = todoSpanNode.textContent;
      var editInputContainer = document.createElement("form");
      var editInput = document.createElement("input");
      editInput.value = todoText;
      editInput.setAttribute("id", "edit");
      editInput.setAttribute("type", "text");
      editInput.setAttribute("autocomplete", "off");
      editInput.setAttribute("maxlength", "100");
      editInput.required = true;
      editInputContainer.appendChild(editInput);
      todoNode.replaceChild(editInputContainer, todoSpanNode);
      editInputContainer.addEventListener("submit", function(event) {
        event.preventDefault();
        editing = false;
        todoText = event.target[0].value;
        var newState = todoFunctions.editTodo(state, todoText, todo.id);
        todoSpanNode.textContent = todoText;
        todoNode.replaceChild(todoSpanNode, editInputContainer);
      });

      // deselect edit upon click elsewhere
      document.addEventListener("click", function(event) {
        if (
          editing &&
          !event.target.isEqualNode(editInput) &&
          !event.target.isEqualNode(todoSpanNode)
        ) {
          todoText = editInput.value;
          var newState = todoFunctions.editTodo(state, todoText, todo.id);
          todoSpanNode.textContent = todoText;
          console.log("editing: ", editing);
          editing = false;
          console.log(todoNode.children);
          todoNode.replaceChild(editInputContainer, todoSpanNode);
        }
      });
    });

    todoNode.appendChild(todoSpanNode);

    // this adds the delete button
    // define content variables
    var sureContent = "sure?";
    var deleteButtonNode = document.createElement("button");
    deleteButtonNode.classList.add("del-btn");
    deleteButtonNode.addEventListener("click", function(event) {
      editing = false;
      var parentClassList = deleteButtonNode.parentNode.classList;
      if (parentClassList.contains("delete")) {
        var newState = todoFunctions.deleteTodo(state, todo.id);
        update(newState);
      } else {
        deleteButtonNode.textContent = sureContent;
        deleteButtonNode.parentNode.classList.add("delete");
        window.setTimeout(function() {
          deleteButtonNode.parentNode.classList.remove("delete");
          deleteButtonNode.textContent = "";
        }, 4000);
      }
    });
    todoNode.appendChild(deleteButtonNode);

    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function(event) {
      event.preventDefault();
      var description = event.target[0].value;
      event.target[0].value = ""; // wipe the form value
      // console.log(description);
      var newState = todoFunctions.addTodo(state, description); // ?? change this!
      update(newState);
    });
  }

  var update = function(newState) {
    state = todoFunctions.sortTodos(newState); // sorts todos before rendering
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement("ul");

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();
