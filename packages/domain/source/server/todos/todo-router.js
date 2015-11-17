Space.eventSourcing.Router.extend(Todos, 'TodosRouter', {

  aggregate: Todos.TodoList,

  initializingCommand: Todos.CreateTodoList,

  routeCommands: [
    Todos.CreateTodo,
    Todos.CompleteTodo,
    Todos.ReopenTodo
  ]

});
