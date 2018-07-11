var test = require("tape");
var logic = require("./logic");

test("Example test", function(t) {
  t.pass();
  t.end();
});

// Tests for addTodo
test("addTodo: testing 'smash avocados' returns proper object", function(t) {
  var actual = logic.addTodo([], "smash avocados");
  var expected = [{ id: 1, description: "smash avocados", done: false }];
  t.deepEqual(
    actual,
    expected,
    "testing 'smash avocados' returns proper object"
  );
  t.end();
});

test("addTodo: testing 'eat all the jaffa cakes' returns proper object", function(t) {
  var actual = logic.addTodo([], "eat all the jaffa cakes");
  var expected = [
    { id: 2, description: "eat all the jaffa cakes", done: false }
  ];
  t.deepEqual(
    actual,
    expected,
    "testing 'eat all the jaffa cakes' returns proper object"
  );
  t.end();
});

test("addTodo: add second entry to existing array of objects", function(t) {
  var actual = logic.addTodo(
    [{ id: 0, description: "start diet", done: false }],
    "eat all the jaffa cakes"
  );
  var expected = [
    { id: 0, description: "start diet", done: false },
    { id: 3, description: "eat all the jaffa cakes", done: false }
  ];
  t.deepEqual(
    actual,
    expected,
    "add 'eat all the jaffa cakes' to 'start diet' todo list"
  );
  t.end();
});

test("addTodo: test object is being cloned/is pure", function(t) {
  var actual = logic.addTodo(
    [{ id: 0, description: "start diet", done: false }],
    "eat all the jaffa cakes"
  );
  var expected = [
    { id: 0, description: "start diet", done: false },
    { id: 4, description: "eat all the jaffa cakes", done: false }
  ];
  t.deepEqual(
    actual,
    expected,
    "add 'eat all the jaffa cakes' to 'start diet' todo list"
  );
  t.end();
});
// Tests for deleteTodo

// Tests for markTodo

// ( Tests for sortTodos - to be completed later as strech goal)
