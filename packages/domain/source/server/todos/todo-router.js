Space.eventSourcing.Router.extend(Todos, 'TodosRouter', {

  aggregate: Todos.TodoList,

  initializingCommand: Todos.CreateTodoList,

  routeCommands: [
    Todos.CreateTodoItem,
    // Todos.CompleteTodoItem
  ]
  
});
