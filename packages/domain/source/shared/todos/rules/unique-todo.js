Space.domain.Rule.extend('Todos.UniqueTodoRule', {

  mixin: [
    Space.messaging.CommandSending
  ],

  enforceMap() {
    return [{
      'Todos.CreateTodo': this._onCreateTodo
    }]
  },

  _onCreateTodo(command, next) {
    console.log(
      ['rule', 'before'], 'Todos.UniqueTodoRule', command.toString(),
      ['S', 'C']
    )

    this.send(
      new Todos.ValidateTodo({title: command.title}), function(err, result) {
        if (result === false) {
          alert('So much duplication, so much wow');
          throw new Error();
        } else {
          next(command);
        }
      }
    );
  },

});
