Space.eventSourcing.Projection.extend(Todos, 'TodosProjection', {

  collections: {
    todos: 'Todos.Todos'
  },

  eventSubscriptions() {
    return [{
      'Todos.TodoListCreated': this._onTodoListCreated,
      'Todos.TodoCreated': this._onTodoCreated,
      'Todos.TodoCompleted': this._onTodoCompleted,
      'Todos.TodoReopened': this._onTodoReopened
    }];
  },

  _onTodoListCreated(event) {

    this.todos.insert({
      _id: event.sourceId.toString(),
      name: event.name,
      todos: []
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
  },

  _onTodoCompleted(event) {
    this.todos.update({_id: event.sourceId.toString, 'todos.id': event.todoId.toString()}, {
      $set: {
        'todos.$.isCompleted': true
      }
    });
  },

  _onTodoReopened(event) {
    this.todos.update({_id: event.sourceId.toString, 'todos.id': event.todoId.toString()}, {
      $set: {
        'todos.$.isCompleted': false
      }
    });
  }

});
