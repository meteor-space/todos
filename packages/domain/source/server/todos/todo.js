Space.eventSourcing.Aggregate.extend(Todos, 'Todo', {

  FIELDS: {
    title: null,
    isCompleted: null
  },

  commandMap: function() {
    return {
      'Todos.CreateTodo': this._createTodo
    };
  },

  _createTodo: function(command) {
    this.record(new Todos.TodoCreated({
      sourceId: this.getId(),
      title: command.title,
      isCompleted: command.isCompleted
    }));
  }

});
