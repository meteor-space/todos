Space.eventSourcing.Aggregate.extend(Todos, 'TodoList', {

  fields: {
    name: String,
    todos: [Todos.TodoItem]
  },

  commandMap() {
    return {
      'Todos.CreateTodoList': this._createTodoList,
      'Todos.CreateTodoItem': this._createTodoItem
    };
  },

  eventMap() {
    return {
      'Todos.TodoListCreated': this._handleNewTodoList,
      'Todos.TodoItemCreated': this._handleNewTodoItem
    };
  },

  // ============= COMMAND HANDLERS =============

  _createTodoList(command) {
    this.record(new Todos.TodoListCreated(this._eventPropsFromCommand(command)));
  },

  _createTodoItem(command) {
    this.record(new Todos.TodoItemCreated(this._eventPropsFromCommand(command)));
  },

  // ============= EVENT HANDLERS ============

  _handleNewTodoList(event) {
    this._assignFields(event);
    this.todos = [];
  },

  _handleNewTodoItem(event) {
    this.todos.push(new Todos.TodoItem({
      id: new Guid(),
      title: event.title,
      isCompleted: event.isCompleted
    }));
  }

});

Todos.TodoList.registerSnapshotType(`Todos.TodoList`);
