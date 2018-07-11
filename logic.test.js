var test = require("tape");
var logic = require("./logic.js");

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
var state = [
  { id: -3, description: "first todo" },
  { id: -2, description: "second todo" },
  { id: -1, description: "third todo" }
];

test("Tests for deleteTodo", function(t) {
  t.deepEqual(logic.deleteTodo([], 5), [], "Should return an array");
  t.deepEqual(
    logic.deleteTodo([{ id: 1, done: false }], 1),
    [],
    "Should delete element with id: 1"
  );
  t.deepEqual(
    logic.deleteTodo(state, -2),
    [
      { id: -3, description: "first todo" },
      { id: -1, description: "third todo" }
    ],
    "Should delete only one element"
  );
  t.notStrictEqual(
    logic.deleteTodo(state, 0),
    state,
    "Should not return original array"
  );
  t.end();
});

// Tests for markTodo

// ( Tests for sortTodos - to be completed later as strech goal)
