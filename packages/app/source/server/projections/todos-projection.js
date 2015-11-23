Space.eventSourcing.Projection.extend(Todos, 'TodosProjection', {

  collections: {
    todos: 'Todos.Todos'
  },

  eventSubscriptions() {
    return [{
      'Todos.TodoCreated': this._onTodoCreated,
    }];
  },

  _onTodoCreated(event) {

    this.todos.insert({
      listId: event.sourceId,
      title: event.title,
      isCompleted: event.isCompleted
    });

  }

});
