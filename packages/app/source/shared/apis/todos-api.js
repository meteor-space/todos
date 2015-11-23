Space.messaging.Api.extend(Todos, 'TodosApi', {

  dependencies: {
    todos: 'Todos.Todos'
  },

  methods() {
    return [{
      'Todos.CreateTodoList': this._createTodoList,
      'Todos.CreateTodo': this._createTodo,
    }];
  },

  _createTodoList(context, command) {
    if (context.isSimulation) {

    } else {
      this.send(command);
    }
  },

  _createTodo(context, command) {
    if (context.isSimulation) {
      this.todos.insert({title: event.title});
    } else {
      this.send(command);
    }
  },

});
