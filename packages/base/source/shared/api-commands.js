Space.messaging.define(Space.messaging.Command, 'Todos', {

  CreateTodoList: {
    name: String
  },

  CreateTodo: {
    title: String,
    isCompleted: Boolean
  },

  CompleteTodo: {
    todoId: Guid
  },

  ReopenTodo: {
    todoId: Guid
  },

  RemoveTodo: {
    todoId: Guid
  }

});
