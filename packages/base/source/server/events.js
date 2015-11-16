Space.messaging.define(Space.messaging.Event, 'Todos', {

  TodoListCreated: {
    name: String
  },

  TodoCreated: {
    id: Guid,
    title: String,
    isCompleted: Boolean
  },

  TodoCompleted: {
    id: Guid
  },

  TodoReopened: {
    id: Guid
  }

});
