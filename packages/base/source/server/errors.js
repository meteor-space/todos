
Space.Error.extend(Todos, 'TodoCannotBeCompleted', {
  message: 'Todo cannot be completed because it is already completed.'
});

Space.Error.extend(Todos, 'TodoCannotBeReopened', {
  message: 'Todo cannot be reopened because it is already open.'
});

Space.Error.extend(Todos, 'TodoNotFoundError', {
  Constructor(todoId) {
    Space.Error.constructor.call(this);
    this.message = `No todo with id ${todoId} found.`;
  }
});

Space.Error.extend(Todos, 'NoCompletedTodosToReopen', {
  message: 'There are no completed todos to reopen.'
});

Space.Error.extend(Todos, 'NoOpenTodosToComplete', {
  message: 'There are no open todos to complete.'
});
