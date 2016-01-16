Space.Object.extend('Todos.TodosController', {

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
      'Todos.TodoReopened': this._onTodoReopened,
      'Todos.TodoCompleted': this._onTodoCompleted,
      'Todos.TodoRemoved': this._onTodoRemoved,
      'Todos.TodoTitleChanged': this._onTodoTitleChanged
    }];
  },

  _onTodoCreated(event) {
    this.send(new Todos.CreateTodo({
      targetId: this.configuration.todoListId,
      title: event.title
    }));
  },

  _onTodoReopened(event) {
    this.send(new Todos.ReopenTodo({
      targetId: this.configuration.todoListId,
      todoId: new Guid(event.todoId)
    }));
  },

  _onTodoCompleted(event) {
    this.send(new Todos.CompleteTodo({
      targetId: this.configuration.todoListId,
      todoId: new Guid(event.todoId)
    }));
  },

  _onTodoRemoved(event) {
    this.send(new Todos.RemoveTodo({
      targetId: this.configuration.todoListId,
      todoId: new Guid(event.todoId)
    }));
  },

  _onTodoTitleChanged(event) {
    this.send(new Todos.ChangeTodoTitle({
      targetId: this.configuration.todoListId,
      todoId: new Guid(event.todoId),
      newTitle: event.newTitle
    }));
  }

});
