Space.messaging.Serializable.extend(Todos, 'Todo', {});

// EJSON serializable fields
Todos.Todo.fields = {
  title: String,
  isCompleted: Boolean
};

// Register as EJSON type
Todos.Todo.type('Todos.Todo');
