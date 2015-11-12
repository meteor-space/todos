Space.domain.Entity.extend(Todos, 'TodoItem', {});

// EJSON serializable fields
Todos.TodoItem.fields = {
  title: String,
  isCompleted: Boolean
};

// Register as EJSON type
Todos.TodoItem.type('Todos.TodoItem');
