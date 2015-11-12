Space.eventSourcing.Router.extend(Todos, 'TodosRouter', {

  Aggregate: Todos.TodoList,

  InitializingCommand: Todos.CreateTodoList,

  RouteCommands: [
    Todos.CreateTodoItem,
    // Todos.CompleteTodoItem
  ]
  
});
