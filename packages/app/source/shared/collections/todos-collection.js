let todos = new Mongo.Collection('todos');

todos.findCompletedTodos = function() {
  return todos.find({ isCompleted: true });
};

todos.findActiveTodos = function() {
  return todos.find({ isCompleted: false });
};

// Contrived example! Here you could specify your real rules
todos.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Todos.Todos = todos;
