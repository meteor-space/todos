Space.Object.extend('Todos.TodosUniquenessService', {

  mixin: [
    Space.messaging.CommandHandling
  ],

  dependencies: {
    repository: 'Todos.TodosRepository'
  },

  commandHandlers() {
    return [{
      'Todos.ValidateTodo': this._validateTodo
    }];
  },

  _validateTodo(command) {
    return this.repository.isUniqueTodoByTitle(command.title);
  }

});