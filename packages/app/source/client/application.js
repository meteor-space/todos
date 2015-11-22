Space.Application.extend(Todos, 'App', {

  configuration: {
    appId: 'Todos.App',
    todoListId: '18c18a9a-25da-42ab-84dd-61f3bfff6999',
    //todoListId: new Guid('18c18a9a-25da-42ab-84dd-61f3bfff6999'),
  },

  requiredModules: [
    'Space.flux'
  ],

  stores: [
    'Todos.TodosStore'
  ],

  controllers: [
    'Todos.RouteController',
    'Todos.LayoutController',
    'Todos.TodosController',
  ],

  components: [
    'Todos.Input',
    'Todos.TodoList',
    'Todos.Footer',
  ],

  singletons: [
    'Todos.TodosApi'
  ],

  onInitialize() {
    this.injector.map('Layout').to(BlazeLayout);
    this.injector.map('Router').to(FlowRouter);
  }

});
