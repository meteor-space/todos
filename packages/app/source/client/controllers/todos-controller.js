Space.Object.extend(Todos, 'TodosController', {

  mixin: [
    Space.messaging.EventSubscribing,
    Space.messaging.CommandSending
  ],

  dependencies: {
    configuration: 'configuration'
  },

  eventSubscriptions() {
    return [{
      'Todos.TodoCreated': this._onTodoCreated,
      'Todos.TodoToggled': this._onTodoToggled,
      'Todos.TodoDeleted': this._onTodoDeleted,
    }];
  },

  _onTodoCreated(event) {
    this.send(new Todos.CreateTodo({
      targetId: this.configuration.todoListId,
      title: event.title,
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
  },

  _onTodoDeleted(event) {
    this.send(new Todos.DeleteTodo({
      targetId: this.configuration.todoListId,
      todoId: new Guid(event.todoId)
    }));
  },

});
