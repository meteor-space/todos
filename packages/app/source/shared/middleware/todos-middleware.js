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
  _onBeforeCreateTodo(context, command) {
    console.log(
      ['hook', 'beforeMap'], 'Todos.TodosMiddleware', '_onBeforeCreateTodo',
      command.toString(), ['S']
    )
  },

  // only mapped to Todos.TodosApi::middleware() on server
  _onAfterCreateTodo(context, command) {
    console.log(
      ['hook', 'afterMap'], 'Todos.TodosMiddleware', '_onAfterCreateTodo',
      command.toString(), ['S']
    )
  },

});