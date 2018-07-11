var test = require('tape');
var logic = require('./logic.js');

// Tests for addTodo



// Tests for deleteTodo
test('Tests for deleteTodo', function(t){
    var actual = logic.deleteTodo([],5);
    var expected = [];
    t.deepEqual(actual,expected,"Should return an array");
    t.end();
})


// Tests for markTodo



// ( Tests for sortTodos - to be completed later as strech goal)



