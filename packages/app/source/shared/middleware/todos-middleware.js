Space.messaging.ApiMiddleware.extend('Todos.TodosMiddleware', {

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

  // only mapped to Todos.TodosApi::middleware() on server
  _onBeforeCreateTodo(context, command, next) {
    console.log(
      ['hook', 'beforeMap'], 'Todos.TodosMiddleware', '_onBeforeCreateTodo',
      command.toString(), ['S']
    );

    next(context, command);
  },

  // only mapped to Todos.TodosApi::middleware() on server
  _onAfterCreateTodo(context, command, response, next) {
    console.log(
      ['hook', 'afterMap'], 'Todos.TodosMiddleware', '_onAfterCreateTodo',
      command.toString(), ['S'], response
    );

    next(context, command, response);
  },

});