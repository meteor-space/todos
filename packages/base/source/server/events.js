Space.messaging.define(Space.messaging.Event, 'Todos', {

  TodoListCreated: {
    name: String
  },

  TodoItemCreated: {
    title: String,
    isCompleted: Boolean
  }

});
