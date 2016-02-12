Space.messaging.ApiMiddleware.extend('Todos.LoggingMiddleware', {

  dependencies: {
    log: 'log'
  },

  before(context, command, next) {
    console.log(
      ['hook', 'globalBefore'], 'Todos.LoggingMiddleware', command.toString(),
      ['S', 'C']
    );
    this.log.info(
      'Todos.LoggingMiddleware' + ' globalBefore ' + command.toString()
    );

    next(context, command);
  },

  after(context, command, response, next) {
    console.log(
      ['hook', 'globalAfter'], 'Todos.LoggingMiddleware', command.toString(),
      ['S', 'C'], response
    );
    this.log.info(
      'Todos.LoggingMiddleware' + ' globalAfter ' + command.toString()
    );

    next(context, command, response);
  }

});
