var test = require('tape');
var logic = require('./logic.js');

// Tests for addTodo



// Tests for deleteTodo
var state = [
    { id: -3, description: 'first todo' },
    { id: -2, description: 'second todo' },
    { id: -1, description: 'third todo' },
  ];

test('Tests for deleteTodo', function(t){
    t.deepEqual(logic.deleteTodo([],5), [], "Should return an array");
    t.deepEqual(logic.deleteTodo([{id: 1, done: false}], 1), [], 'Should delete element with id: 1');
    t.deepEqual(logic.deleteTodo(state,-2),[{ id: -3, description: 'first todo' },{ id: -1, description: 'third todo' }],"Should delete only one element")
    t.notStrictEqual(logic.deleteTodo(state,0),state,"Should not return original array")
    t.end();
})



// Tests for markTodo



// ( Tests for sortTodos - to be completed later as strech goal)



