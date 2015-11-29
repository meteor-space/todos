Space.messaging.Controller.extend(Todos, 'TodosController', {

  dependencies: {
    configuration: 'configuration'
  },

  eventSubscriptions() {
    return [{
      'Todos.TodoCreated': this._onTodoCreated,
      'Todos.TodoToggled': this._onTodoToggled,
    }];
  },

  _onTodoCreated(event) {
    this.send(new Todos.CreateTodo({
      targetId: this.configuration.todoListId,
      title: event.title,
      id: new Guid(),
      isCompleted: false
    }));
  },

  _onTodoToggled(event) {
    if (event.isCompleted) {
      this.send(new Todos.ReopenTodo({
        targetId: this.configuration.todoListId,
        todoId: new Guid(event.id)
      }));
    } else {
      this.send(new Todos.CompleteTodo({
        targetId: this.configuration.todoListId,
        todoId: new Guid(event.id)
      }));
    }
  }

});
