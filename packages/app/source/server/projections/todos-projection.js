Space.eventSourcing.Projection.extend(Todos, 'TodosProjection', {

  collections: {
    todos: 'Todos.TodoLists'
  },

  eventSubscriptions() {
    return [{
      'Todos.TodoListCreated': this._onTodoListCreated,
      'Todos.TodoCreated': this._onTodoCreated,
      'Todos.TodoCompleted': this._onTodoCompleted,
      'Todos.TodoReopened': this._onTodoReopened,
      'Todos.TodoRemoved': this._onTodoRemoved,
      'Todos.TodoTitleChanged': this._onTodoTitleChanged
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
    this.todos.update(event.sourceId.toString(), {
      $push: { todos: {
        id: event.id.toString(),
        title: event.title,
        isCompleted: event.isCompleted
      }}
    });
  },

  _onTodoCompleted(event) {
    this.todos.update({_id: event.sourceId.toString(), 'todos.id': event.todoId.toString()}, {
      $set: {
        'todos.$.isCompleted': true
      }
    });
  },

  _onTodoReopened(event) {
    this.todos.update({_id: event.sourceId.toString(), 'todos.id': event.todoId.toString()}, {
      $set: {
        'todos.$.isCompleted': false
      }
    });
  },

  _onTodoRemoved(event) {
    let removeTodo = {$pull:{todos: {id: event.todoId.toString()}}};
    this.todos.update({'_id': event.sourceId.toString()}, removeTodo);
  },

  _onTodoTitleChanged(event) {
    this.todos.update({_id: event.sourceId.toString(), 'todos.id': event.todoId.toString()}, {
      $set: {
        'todos.$.title': event.newTitle
      }
    });
  }

});
