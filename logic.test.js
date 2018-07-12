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

test("Tests for markTodo", function(t) {
  t.deepEqual(
    logic.markTodo(state, -4) instanceof Array,
    true,
    "Should return array"
  );
  t.notStrictEqual(
    logic.markTodo(state, -4),
    state,
    "Shouldn't return same array as passed in as argument"
  );
  t.deepEqual(
    logic.markTodo([{ id: -1, done: false }], -1),
    [{ id: -1, done: true }],
    "Should alter item with id of -1, toggling 'done'"
  );
  t.deepEqual(
    logic.markTodo(
      [
        { id: -1, done: false },
        { id: -2, done: false },
        { id: -3, done: true }
      ],
      -1
    ),
    [{ id: -1, done: true }, { id: -2, done: false }, { id: -3, done: true }],
    "Should only alter item with id of -1, toggling 'done'"
  );
  t.end();
});

// ( Tests for sortTodos - to be completed later as strech goal)

var stateSort = [
  { id: -3, description: "first todo", done: true },
  { id: -2, description: "second todo", done: false },
  { id: -1, description: "third todo", done: false }
];

test("Tests for sortTodos", function(t) {
  t.equal(logic.sortTodos(state) instanceof Array, true, "Should return array");
  t.deepEqual(
    logic.sortTodos(stateSort),
    [
      { id: -2, description: "second todo", done: false },
      { id: -1, description: "third todo", done: false },
      { id: -3, description: "first todo", done: true }
    ],
    "Should return sorted array"
  );
  t.end();
});
