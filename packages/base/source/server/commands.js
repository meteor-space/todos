Space.messaging.define(Space.messaging.Command, 'Todos', {

  CreateTodoList: {
    name: String
  },

  CreateTodo: {
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
