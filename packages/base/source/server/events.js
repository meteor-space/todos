Space.messaging.define(Space.messaging.Event, 'Todos', {

  TodoListCreated: {
    name: String
  },

  TodoCreated: {
    title: String,
    isCompleted: Boolean
  },

  TodoCompleted: {
    id: Guid,
    isCompleted: Boolean
  },

  TodoReopened: {
    id: Guid,
    isCompleted: Boolean
  }

});
