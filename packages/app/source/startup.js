Meteor.startup(function() {
  Todos.app = new Todos.App();
  Todos.app.start();
  FlowRouter.initialize();
});
