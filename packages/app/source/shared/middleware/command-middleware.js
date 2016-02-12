Space.messaging.CommandMiddleware.extend('Todos.CommandMiddleware', {

  beforeMap() {
    return [{
      'Todos.CreateTodo': this._onBeforeCreateTodo
    }]
  },

  afterMap() {
    return [{
      'Todos.CreateTodo': this._onAfterCreateTodo
    }]
  },

  before(command, next) {
    console.log(
      ['hook', 'globalBefore'], 'Todos.CommandMiddleware', command.toString(),
      ['S', 'C']
    );
    next(command);
  },

  after(command, response, next) {
    console.log(
      ['hook', 'globalAfter'], 'Todos.CommandMiddleware', command.toString(),
      ['S', 'C'], response
    );
    next(command, response);
  },

  _onBeforeCreateTodo(command, next) {
    console.log(
      ['hook', 'beforeMap'], 'Todos.CommandMiddleware', '_onBeforeCreateTodo',
      command.toString(), ['S', 'C']
    );

    next(command);
  },
  _onAfterCreateTodo(command, response, next) {
    console.log(
      ['hook', 'afterMap'], 'Todos.CommandMiddleware', '_onAfterCreateTodo',
      command.toString(), ['S', 'C'], response
    );

    next(command, response);
  },


});
