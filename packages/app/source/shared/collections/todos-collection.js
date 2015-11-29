let todos = new Mongo.Collection('todos');

todos.findCompletedTodos = function() {
  return todos.find({ isCompleted: true });
};

todos.findActiveTodos = function() {
  return todos.find({ isCompleted: false });
};

Todos.Todos = todos;
