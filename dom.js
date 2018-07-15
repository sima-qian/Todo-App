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
    todoNode.appendChild(markButtonNode);
    markButtonNode.addEventListener("click", function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });

    // add span element holding todo description
    var todoSpanNode = document.createElement("span");
    todoSpanNode.setAttribute("onclick", "event.stopPropagation()");
    todoSpanNode.textContent = todo.description;
    todoNode.appendChild(todoSpanNode);

    // event listener for todo editing
    todoSpanNode.addEventListener("click", function(event) {
      editing = true;
      var todoText = todoSpanNode.textContent; // save current todo text

      // create form element
      var editInputContainer = document.createElement("form");
      editInputContainer.innerHTML =
        '<input id="edit" type="text" onclick="event.stopPropagation()" maxlength="100" autocomplete="off" value="' +
        todoText +
        '" />'; // fill form element with input element

      // replace original span with form
      todoNode.replaceChild(editInputContainer, todoSpanNode);

      // automatic focus on input, so user can start typing immediately
      var input = editInputContainer.firstChild;
      input.focus();

      // cheeky hack to get cursor at end of text
      var val = input.value;
      input.value = "";
      input.value = val;

      // event listener for submitting edited text
      editInputContainer.addEventListener("submit", function(event) {
        // upon pressing enter
        event.preventDefault();
        saveEdit();
      });

      // event listener for clicking elsewhere while editing
      document.addEventListener("click", saveEdit);

      var todoList = document.querySelectorAll("span");
      todoList.forEach(span =>
        span.addEventListener("click", function() {
          saveEdit();
        })
      );

      function saveEdit() {
        editing = false;
        todoText = editInputContainer.firstChild.value;
        var newState = todoFunctions.checkTodoTextBlank(
          state,
          todoText,
          todo.id
        );
        todoList.forEach(span => span.removeEventListener("click", saveEdit));
        document.removeEventListener("click", saveEdit);
        update(newState);
      }
    });

    // add the deleteTodo button & functionality
    var deleteButtonNode = document.createElement("button");
    deleteButtonNode.classList.add("del-btn");
    todoNode.appendChild(deleteButtonNode);
    deleteButtonNode.addEventListener("click", function(event) {
      // console.log("delete called");
      // var parentClassList = deleteButtonNode.parentNode.classList;
      // if (parentClassList.contains("delete")) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
      // } else {
      //   deleteButtonNode.parentNode.classList.add("delete");
      //   // console.log(deleteButtonNode.parentNode.classList);
      //   window.setTimeout(function() {
      //     // console.log("callback called");
      //     deleteButtonNode.parentNode.classList.remove("delete");
      //   }, 4000);
      // }
    });

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
