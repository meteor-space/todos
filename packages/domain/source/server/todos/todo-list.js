Space.eventSourcing.Aggregate.extend(Todos, 'TodoList', {

  fields: {
    name: null,
    todos: null
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
    this.todos = [];
  },

  _handleNewTodoItem(event) {
    let todoItem = new Todos.TodoItem(new Guid());
    todoItem.title = event.title;
    todoItem.isCompleted = event.isCompleted;
    this.todos.push(todoItem);
  }

});
