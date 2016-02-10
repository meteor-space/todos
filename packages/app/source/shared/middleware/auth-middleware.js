Space.messaging.ApiMiddleware.extend('Todos.AuthenticatingMiddleware', {

  // mapped on Todos.TodosApi::middleware()
  before(context, command) {
    if (typeof command.title !== "undefined" && command.title === 'error') {
      var error = 'We need more lemon pledge!';
      if (Meteor.isClient) {
        alert(error);
      }
      throw new Meteor.Error(403, error);
    }

    console.log(
      ['hook', 'before'], 'Todos.AuthenticatingMiddleware', command.toString(),
      ['S', 'C']
    )
  },

  // mapped on Todos.TodosApi::middleware()
  after(context, command) {
    console.log(
      ['hook', 'after'], 'Todos.AuthenticatingMiddleware', command.toString(),
      ['S', 'C']
    )
  }
});
