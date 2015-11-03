Space.eventSourcing.Router.extend(Todos, 'TodosRouter', {

  Aggregate: Todos.TodoItems,
  InitializingCommand: Todos.CreateTodoItems
  
});
