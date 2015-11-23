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
    'Todos.TodosPublication'
  ],

  onInitialize() {
    this.injector.map('Todos.Todos').to(Todos.Todos);
    this.configuration.todoListId = new Guid('18c18a9a-25da-42ab-84dd-61f3bfff6999');
  },

  onStart() {
    this._ensureTodoList();
  },

  onReset() {
    this.injector.get('Todos.Todos').remove({})
  },

  _ensureTodoList() {
    if(Todos.Todos.find(this.configuration.todoListId).count() === 0) {
      this.send(new Todos.CreateTodoList({
        targetId: this.configuration.todoListId,
        name: this.configuration.todoListName
      }));
    }
  }

});
