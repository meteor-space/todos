Space.messaging.define(Space.messaging.Command, 'Todos', {

  CreateTodoList: {
    name: String
  },

  CreateTodo: {
    id: Guid,
    title: String,
    isCompleted: Boolean
  },

  CompleteTodo: {
    id: Guid
  },

  ReopenTodo: {
    id: Guid
  }

});
