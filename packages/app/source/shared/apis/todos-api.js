Space.messaging.Api.extend('Todos.TodosApi', {

  dependencies: {
    todos: 'Todos.TodoLists'
  },

  methods() {
    return [{
      'Todos.CreateTodoList': this._createTodoList,
      'Todos.CreateTodo': this._createTodo,
      'Todos.CompleteTodo': this._completeTodo,
      'Todos.ReopenTodo': this._reopenTodo,
      'Todos.RemoveTodo': this._removeTodo,
      'Todos.ChangeTodoTitle': this._changeTodoTitle,
      'Todos.ValidateTodo': this._validateTodo
    }];
  },

  /*
  If middleware uses 'before' or/and 'after' - this hooks will be applied
  to each method handler that is here specified on this.methods()

  Todos.TodosApi is shared between client and server, so by that
  we are enforcing SAME middleware rules on client and server.

  This is very important if we need same validation on client and server.
  */
  middleware() {
    var middleware = []
    if (Meteor.isServer) {
      middleware.push(Todos.TodosMiddleware);
    }
    middleware.push(Todos.AuthenticatingMiddleware);

    return middleware
  },
  // OR simple shared/specified to side where todos-api.js (this file) is
  // mapped on package.js(server/client)

  // middleware() {
  //   return [
  //     Todos.AuthenticatingMiddleware,
  //     Todos.TodosMiddleware
  //   ]
  // },



  // Applies just to specific command handlers
  beforeMap() {
    return [{
      'Todos.CreateTodo': this._onBeforeCreateTodo
      // 'Todos.CompleteTodo': this.someDependency.completeTodo,
    }]
  },

  // Applies just to specific command handlers
  afterMap() {
    return [{
      'Todos.CreateTodo': this._onAfterCreateTodo
    }]
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

  _onBeforeCreateTodo(context, command, next) {
    console.log(
      ['hook', 'beforeMap'], 'Todos.TodosApi', '_onBeforeCreateTodo',
      command.toString(), ['S', 'C']
    );
    next(context, command);
  },

  _createTodo(context, command) {
    console.log(
      ['methodHandler'], 'Todos.TodosApi', '_createTodo', command.toString(),
      ['S', 'C']
    );

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

  _onAfterCreateTodo(context, command, response, next) {
    console.log(
      ['hook', 'afterMap'], 'Todos.TodosApi', '_onAfterCreateTodo',
      command.toString(), ['S', 'C'], response
    );
    next(context, command, response);
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

  _removeTodo(context, command) {
    if (context.isSimulation) {
      let removeTodo = {$pull:{todos: {id: command.todoId.toString()}}};
      this.todos.update({'_id': command.targetId.toString()}, removeTodo);
    } else {
      this.send(command);
    }
  },

  _changeTodoTitle(context, command) {
    if (context.isSimulation) {
      this.todos.update({_id: command.targetId.toString(), 'todos.id': command.todoId.toString()}, {
        $set: {
          'todos.$.title': command.newTitle
        }
      });
    } else {
      this.send(command);
    }
  },

  _validateTodo(context, command) {
    if (!context.isSimulation) {
      return this.send(command);
    }
  }

});
