Space.eventSourcing.Aggregate.extend(Todos, 'TodoItems', {

  FIELDS: {
    name: null
  },

  commandMap: function() {
    return {
      'Todos.CreateTodoItems': this._createTodoItems
    };
  },

  _createTodoItems: function(command) {
    this.record(new Todos.TodoItemsCreated({
      sourceId: this.getId(),
      name: command.name
    }));
  }

});
