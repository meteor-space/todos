Space.eventSourcing.Aggregate.extend(Todos, 'TodoList', {

  fields: {
    name: String,
    todos: [Todos.TodoItem]
  },

  commandMap() {
    return {
      'Todos.CreateTodoList': this._createTodoList,
      'Todos.CreateTodo': this._createTodo,
      'Todos.CompleteTodo': this._completeTodo
    };
  },

  eventMap() {
    return {
      'Todos.TodoListCreated': this._handleNewTodoList,
      'Todos.TodoCreated': this._handleNewTodo,
      'Todos.TodoCompleted': this._handleCompleteTodo
    };
  },

  // ============= COMMAND HANDLERS =============

  _createTodoList(command) {
    this.record(new Todos.TodoListCreated(this._eventPropsFromCommand(command)));
  },

  _createTodo(command) {
    this.record(new Todos.TodoCreated(this._eventPropsFromCommand(command)));
  },

  _completeTodo(command) {

    let todo = _.find(this.todos, function(todo) {
      return (todo.id.id === command.id.id);
    });

    if (todo instanceof Todos.TodoItem && todo.isCompleted === true) {
      throw new Todos.TodoCannotBeCompleted();
    } else {
      this.record(new Todos.TodoCompleted(this._eventPropsFromCommand(command)));
    }

  },

  // ============= EVENT HANDLERS ============

  _handleNewTodoList(event) {
    this._assignFields(event);
    this.todos = [];
  },

  _handleNewTodo(event) {


    let todo = new Todos.TodoItem({
      id: event.id,
      title: event.title,
      isCompleted: event.isCompleted
    });

    this.todos.push(todo);
  },

  _handleCompleteTodo(event) {
    _.find(this.todos, function(todo) {
      if (todo.id.id === event.id.id) {
        todo.isCompleted = true;
      }
    });
  }

});

Todos.TodoList.registerSnapshotType(`Todos.TodoList`);
