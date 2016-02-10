Space.messaging.ApiMiddleware.extend('Todos.LoggingMiddleware', {

  dependencies: {
    log: 'log'
  },

  before(context, command) {
    console.log(
      ['hook', 'globalBeforeHook'], 'Todos.LoggingMiddleware', command.toString(),
      ['S', 'C']
    )
    this.log.info(
      'Todos.LoggingMiddleware' + ' globalBefore ' + command.toString()
    );
  },

  after(context, command) {
    console.log(
      ['hook', 'globalAfterHook'], 'Todos.LoggingMiddleware', command.toString(),
      ['S', 'C']
    )
    this.log.info(
      'Todos.LoggingMiddleware' + ' globalAfter ' + command.toString()
    );
  }

});
