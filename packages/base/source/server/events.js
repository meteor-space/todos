Space.messaging.define(Space.messaging.Event, 'Todos', {

  TodoListCreated: {
    name: String
  },

  TodoCreated: {
    id: Guid,
    title: String
  },

  TodoCompleted: {
    todoId: Guid
  },

  TodoReopened: {
    todoId: Guid
  }

});
