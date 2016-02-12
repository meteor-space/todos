Space.messaging.ApiMiddleware.extend('Todos.AuthenticatingMiddleware', {

  // mapped on Todos.TodosApi::middleware()
  before(context, command, next) {
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
    );

    next(context, command);
  },

  // mapped on Todos.TodosApi::middleware()
  after(context, command, response, next) {
    console.log(
      ['hook', 'after'], 'Todos.AuthenticatingMiddleware', command.toString(),
      ['S', 'C'], response
    );

    next(context, command, response);
  }
});
