Space.eventSourcing.Router.extend(Todos, 'TodosRouter', {

  eventSourceable: Todos.TodoList,

  initializingMessage: Todos.CreateTodoList,

  routeCommands: [
    Todos.CreateTodo,
    Todos.CompleteTodo,
    Todos.ReopenTodo,
    Todos.DeleteTodo
  ]

});
