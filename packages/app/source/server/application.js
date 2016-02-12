Todos.App = Space.Application.define('Todos.App', {

  configuration: {
    appId: 'Todos.App',
    todoListName: 'My todos'
  },

  requiredModules: [
    'Todos.domain'
  ],

  singletons: [
    'Todos.TodosApi',
    'Todos.TodosProjection',
    'Todos.TodosRepository',
    'Todos.TodosPublication',
    'Todos.LoggingMiddleware',
    'Todos.CommandMiddleware',
    'Todos.TodosUniquenessService'
  ],

  onInitialize() {
    this.injector.map('Todos.TodoLists').to(Todos.TodoLists);
    this.configuration.todoListId = new Guid('18c18a9a-25da-42ab-84dd-61f3bfff6999');
  },

  onStart() {
    this._ensureTodoList();
  },

  onReset() {
    this.injector.get('Todos.TodoLists').remove({});
  },

  _ensureTodoList() {
    if(this.injector.get('Todos.TodoLists').find({_id: this.configuration.todoListId.toString()}).count() === 0) {
      this.send(new Todos.CreateTodoList({
        targetId: this.configuration.todoListId,
        name: this.configuration.todoListName
      }));
    }
  }

});
