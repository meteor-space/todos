Space.domain.Rule.extend('Todos.UniqueTodoRule', {

  enforceMap() {
    return [{
      'Todos.CreateTodo': this._onCreateTodo
    }]
  },

  _onCreateTodo(command) {
    console.log(
      ['rule', 'before'], 'Todos.UniqueTodoRule', command.toString(),
      ['S', 'C']
    )

    if (typeof command.title !== "undefined" && command.title === 'notunique') {
      var error = 'Title must be unique';
      if (Meteor.isClient) {
        alert(error);
      }
      throw new Meteor.Error(403, error);
    }
  },

});
