Space.eventSourcing.Projection.extend('Todos.TodosProjection', {

  dependencies: {
    repository: 'Todos.TodosRepository'
  },

  eventSubscriptions() {
    return [{
      'Todos.TodoListCreated': this._onTodoListCreated,
      'Todos.TodoCreated': this._onTodoCreated,
      'Todos.TodoCompleted': this._onTodoCompleted,
      'Todos.TodoReopened': this._onTodoReopened,
      'Todos.TodoRemoved': this._onTodoRemoved,
      'Todos.TodoTitleChanged': this._onTodoTitleChanged
    }];
  },

  _onTodoListCreated(event) {
    this.repository.createTodoList(event.sourceId, event.name);
  },

  _onTodoCreated(event) {
    this.repository.addTodo(event.sourceId, event.todoId, {
      id: event.todoId,
      title: event.title,
      isCompleted: event.isCompleted
    });
  },

  _onTodoCompleted(event) {
    this.repository.completeTodo(event.sourceId, event.todoId);
  },

  _onTodoReopened(event) {
    this.repository.reopenTodo(event.sourceId, event.todoId);
  },

  _onTodoRemoved(event) {
    this.repository.removeTodo(event.sourceId, event.todoId);
  },

  _onTodoTitleChanged(event) {
    this.repository.changeTitle(event.sourceId, event.todoId, event.newTitle);
  }

});
