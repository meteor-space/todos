Space.eventSourcing.Router.extend(Todos, 'TodosRouter', {

  Aggregate: Todos.Todo,
  InitializingCommand: Todos.CreateTodo
  
});
