Space.Object.extend(Todos, 'TodosController', {

  mixin: [
    Space.messaging.EventSubscribing,
    Space.messaging.CommandSending
  ],

  dependencies: {
    configuration: 'configuration',
    todosStore: 'Todos.TodosStore',
  },

  eventSubscriptions() {
    return [{
      'Todos.TodoCreated': this._onTodoCreated,
      'Todos.TodoToggled': this._onTodoToggled,
      'Todos.TodoDeleted': this._onTodoDeleted,
      'Todos.AllTodosToggled': this._onAllTodosToggled,
      'Todos.CompletedTodosCleared': this._onCompletedTodosCleared
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

  _onAllTodosToggled(event) {
    if (this.todosStore.activeTodos().length > 0) {
      for (let todo of this.todosStore.activeTodos()) {
        this.send(new Todos.CompleteTodo({
          targetId: this.configuration.todoListId,
          todoId: new Guid(todo.id)
        }));
      }
    } else {
      for (let todo of this.todosStore.completedTodos()) {
        this.send(new Todos.ReopenTodo({
          targetId: this.configuration.todoListId,
          todoId: new Guid(todo.id)
        }));
      }
    }
  },

  _onCompletedTodosCleared(event) {
    if (this.todosStore.completedTodos().length > 0) {
      for (let todo of this.todosStore.completedTodos()) {
        this.send(new Todos.DeleteTodo({
          targetId: this.configuration.todoListId,
          todoId: new Guid(todo.id)
        }));
      }
    }
  }

});
