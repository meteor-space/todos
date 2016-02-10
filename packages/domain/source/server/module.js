Todos.domain = Space.Module.define('Todos.domain', {

  requiredModules: ['Space.eventSourcing'],

  singletons: [
    'Todos.TodosRouter',
    'Todos.UniqueTodoRule'
  ]

});
