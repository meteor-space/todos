Space.eventSourcing.Projection.extend(Todos, 'TodosProjection', {

  collections: {
    todos: 'Todos.Todos'
  },

  eventSubscriptions() {
    return [{
      'Todos.TodoListCreated': this._onTodoListCreated,
      'Todos.TodoCreated': this._onTodoCreated
    }];
  },

  _onTodoListCreated(event) {

    this.todos.insert({
      _id: event.sourceId.toString(),
      name: event.name
    });
  },

  _onTodoCreated(event) {
    this.todos.update(event.sourceId.toString, {
      $push: { todos: {
        id: event.id.toString(),
        title: event.title,
        isCompleted: event.isCompleted
      }}
    });
  }

});
