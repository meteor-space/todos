Space.messaging.define(Space.domain.Event, 'Todos', {

  TodoListCreated: {
    name: String
  },

  TodoCreated: {
    todoId: Guid,
    title: String,
    isCompleted: Boolean
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
