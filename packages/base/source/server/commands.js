Space.messaging.define(Space.messaging.Command, 'Todos', {

  CreateTodoList: {
    name: String
  },

  CreateTodoItem: {
    title: String,
    isCompleted: Boolean
  }

});
