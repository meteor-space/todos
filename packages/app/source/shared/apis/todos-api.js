Space.messaging.Api.extend(Todos, 'TodosApi', {

  dependencies: {
    todos: 'Todos.Todos'
  },

  methods() {
    return [{
      'Todos.CreateTodoList': this._createTodoList,
      'Todos.CreateTodo': this._createTodo,
      'Todos.CompleteTodo': this._completeTodo,
      'Todos.ReopenTodo': this._reopenTodo
    }];
  },

  _createTodoList(context, command) {
    if (context.isSimulation) {
      this.todos.insert({
        _id: event.sourceId.toString(),
        name: event.name,
        todos: []
      });
    } else {
      this.send(command);
    }
  },

  _createTodo(context, command) {
    if (context.isSimulation) {
      this.todos.update(event.sourceId, {
        $push: { todos: {
          id: event.id,
          title: event.title,
          isCompleted: event.isCompleted
        }}
      });
    } else {
      this.send(command);
    }
  },

  _completeTodo(context, command) {
    if (context.isSimulation) {
      this.todos.update({_id: command.targetId.toString, 'todos.id': command.todoId.toString()}, {
        $set: {
          'todos.$.isCompleted': true
        }
      });
    } else {
      this.send(command);
    }
  },

  _reopenTodo(context, command) {
    if (context.isSimulation) {
      this.todos.update({_id: command.targetId.toString, 'todos.id': command.todoId.toString()}, {
        $set: {
          'todos.$.isCompleted': false
        }
      });
    } else {
      this.send(command);
    }
  }

});
