Space.messaging.define(Space.domain.Event, 'Todos', {

  TodoListCreated: {
    name: String,
    todos: Array
  },

  TodoCreated: {
    todo: Todos.TodoItem
  },

  TodoCompleted: {
    todoId: Guid
  },

  TodoReopened: {
    todoId: Guid
  },

  TodoRemoved: {
    todoId: Guid
  },

  TodoTitleChanged: {
    todoId: Guid,
    newTitle: String
  }

});
