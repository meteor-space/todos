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

    console.log("TODO CREATED EVENT IN PROJECTION #######");

    this.todos.insert({title: event.title});
  }

});
