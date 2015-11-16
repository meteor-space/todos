Space.eventSourcing.Aggregate.extend(Todos, 'TodoList', {

  fields: {
    name: String,
    todos: [Todos.TodoItem]
  },

  commandMap() {
    return {
      'Todos.CreateTodoList': this._createTodoList,
      'Todos.CreateTodo': this._createTodo
    };
  },

  eventMap() {
    return {
      'Todos.TodoListCreated': this._handleNewTodoList,
      'Todos.TodoCreated': this._handleNewTodo
    };
  },

  // ============= COMMAND HANDLERS =============

  _createTodoList(command) {
    this.record(new Todos.TodoListCreated(this._eventPropsFromCommand(command)));
  },

  _createTodo(command) {
    this.record(new Todos.TodoCreated(this._eventPropsFromCommand(command)));
  },

  // ============= EVENT HANDLERS ============

  _handleNewTodoList(event) {
    this._assignFields(event);
    this.todos = [];
  },

  _handleNewTodo(event) {
    this.todos.push(new Todos.TodoItem({
      id: new Guid(),
      title: event.title,
      isCompleted: event.isCompleted
    }));
  }

});

Todos.TodoList.registerSnapshotType(`Todos.TodoList`);
