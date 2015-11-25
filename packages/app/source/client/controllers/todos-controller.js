Space.messaging.Controller.extend(Todos, 'TodosController', {

  dependencies: {
    configuration: 'configuration'
  },

  eventSubscriptions() {
    return [{
      'Todos.TodoCreated': this._onTodoCreated,
    }];
  },

  _onTodoCreated(event) {
    this.send(new Todos.CreateTodo({
      targetId: this.configuration.todoListId,
      title: event.title,
      id: event.id,
      isCompleted: event.isCompleted
    }));
  }

});
