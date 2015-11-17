Space.Application.extend(Todos, 'App', {

  configuration: {},

  requiredModules: [],

  stores: [],

  controllers: [
    'Todos.RouteController',
    'Todos.LayoutController'
  ],

  components: [
    'Todos.LandingPage'
  ],

  onInitialize() {
    this.injector.map('Layout').to(BlazeLayout);
    this.injector.map('Router').to(FlowRouter);
  }

});
