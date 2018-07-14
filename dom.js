(function() {
  // DOM node containing todo
  var container = document.getElementById("todo-container");

  var addTodoForm = document.getElementById("add-todo");
  var editing = false;

  var state = [
    { id: -3, description: "first todo", done: false },
    { id: -2, description: "second todo", done: false },
    { id: -1, description: "third todo", done: false }
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement("li");

    // add marked class if 'done' is true
    if (todo.done) {
      todoNode.classList.add("marked");
    }

    // add markTodo button & functionality
    var markButtonNode = document.createElement("button");
    markButtonNode.classList.add("mark-btn");
    markButtonNode.addEventListener("click", function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(markButtonNode);

    // add span element holding todo description
    var todoSpanNode = document.createElement("span");
    todoSpanNode.setAttribute("onclick", "event.stopPropagation()");
    todoSpanNode.textContent = todo.description;

    // event listener for todo editing
    todoSpanNode.addEventListener("click", function(event) {
      editing = true;
      var todoText = todoSpanNode.textContent; // save current todo text

      // create form element
      var editInputContainer = document.createElement("form");
      editInputContainer.innerHTML =
        '<input id="edit" type="text" onclick="event.stopPropagation()" maxlength="100" autocomplete="off" value="' +
        todoText +
        '" required/>'; // fill form element with input element

      // replace original span with form
      todoNode.replaceChild(editInputContainer, todoSpanNode);

      // automatic focus on input, so user can start typing immediately
      var input = editInputContainer.firstChild;
      input.focus();

      // cheeky hack to get cursor at end of text
      var val = input.value;
      input.value = "";
      input.value = val;

      // event listener to submitting edited text
      editInputContainer.addEventListener("submit", function(event) {
        // upon pressing enter
        editing = false;
        event.preventDefault();
        todoText = event.target[0].value;
        var newState = todoFunctions.editTodo(state, todoText, todo.id);
        update(newState);
      });

      function saveEdit() {
        // console.log("saveEdit called");
        editing = false;
        todoText = editInputContainer.firstChild.value;
        var newState = todoFunctions.editTodo(state, todoText, todo.id);
        document.removeEventListener("click", saveEdit);
        update(newState);
      }

      document.addEventListener("click", saveEdit);
    });

    // document
    //   .getElementById("todo-container")
    //   .addEventListener("click", function() {
    //     console.log("bubbling");
    //   });

    todoNode.appendChild(todoSpanNode);

    // add the deleteTodo button & functionality
    var deleteButtonNode = document.createElement("button");
    deleteButtonNode.classList.add("del-btn");
    deleteButtonNode.addEventListener("click", function(event) {
      // console.log("delete called");
      var parentClassList = deleteButtonNode.parentNode.classList;
      if (parentClassList.contains("delete")) {
        var newState = todoFunctions.deleteTodo(state, todo.id);
        update(newState);
      } else {
        deleteButtonNode.parentNode.classList.add("delete");
        // console.log(deleteButtonNode.parentNode.classList);
        window.setTimeout(function() {
          // console.log("callback called");
          deleteButtonNode.parentNode.classList.remove("delete");
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
      window.scrollTo(0, 0);
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
