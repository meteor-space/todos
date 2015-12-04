Space.messaging.Api.extend(Todos, 'TodosApi', {

  dependencies: {
    todos: 'Todos.Todos'
  },

  methods() {
    return [{
      'Todos.CreateTodoList': this._createTodoList,
      'Todos.CreateTodo': this._createTodo,
      'Todos.CompleteTodo': this._completeTodo,
      'Todos.ReopenTodo': this._reopenTodo,
      'Todos.DeleteTodo': this._deleteTodo
    }];
  },

  _createTodoList(context, command) {
    if (context.isSimulation) {
      this.todos.insert({
        _id: command.targetId.toString(),
        name: command.name,
        todos: []
      });
    } else {
      this.send(command);
    }
  },

  _createTodo(context, command) {
    if (context.isSimulation) {
      this.todos.update(command.targetId, {
        $push: { todos: {
          id: command.id,
          title: command.title,
          isCompleted: command.isCompleted
        }}
      });
    } else {
      this.send(command);
    }
  },

  _completeTodo(context, command) {
    if (context.isSimulation) {
      this.todos.update({_id: command.targetId.toString(), 'todos.id': command.todoId.toString()}, {
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
      this.todos.update({_id: command.targetId.toString(), 'todos.id': command.todoId.toString()}, {
        $set: {
          'todos.$.isCompleted': false
        }
      });
    } else {
      this.send(command);
    }
  },

  _deleteTodo(context, command) {
    if (context.isSimulation) {
      let removeTodo = {$pull:{todos: {id: command.todoId.toString()}}};
      this.todos.update({'_id': command.targetId.toString()}, removeTodo);
    } else {
      this.send(command);
    }
  }

});
