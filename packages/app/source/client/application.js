Space.Application.extend('Todos.App', {

  configuration: {
    appId: 'Todos.App',
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
    'Todos.Todo',
    'Todos.TodoList',
    'Todos.Footer',
  ],

  singletons: [
    'Todos.TodosApi',
    'Todos.TodosTracker'
  ],

  onInitialize() {
    this.injector.map('Layout').to(BlazeLayout);
    this.injector.map('Router').to(FlowRouter);
    this.injector.map('Todos.TodoLists').to(Todos.TodoLists);
    this.configuration.todoListId = new Guid('18c18a9a-25da-42ab-84dd-61f3bfff6999');
  }

});