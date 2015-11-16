Space.domain.Entity.extend(Todos, 'TodoItem', {

  // EJSON serializable fields
  fields() {
    return {
      id: Guid,
      title: String,
      isCompleted: Boolean
    };
  }
});

// Register as EJSON type
Todos.TodoItem.type('Todos.TodoItem');
