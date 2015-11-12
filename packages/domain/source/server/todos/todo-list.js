Space.eventSourcing.Aggregate.extend(Todos, 'TodoList', {

  FIELDS: {
    name: null,
    todos: null
  },

  commandMap: function() {
    return {
      'Todos.CreateTodoList': this._createTodoList,
      'Todos.CreateTodoItem': this._createTodoItem
    };
  },

  eventMap: function() {
    return {
      'Todos.TodoListCreated': this._handleNewTodoList,
      'Todos.TodoItemCreated': this._handleNewTodoItem
    };
  },

  // ============= COMMAND HANDLERS =============

  _createTodoList: function(command) {
    this.record(new Todos.TodoListCreated(this._eventPropsFromCommand(command)));
    console.log("Create todo list command");
  },

  _createTodoItem: function(command) {
    this.record(new Todos.TodoItemCreated(this._eventPropsFromCommand(command)));
    console.log("Create todo item command");
  },

  // ============= EVENT HANDLERS ============

  _handleNewTodoList: function(event) {
    this.todos = [];
    console.log("Todo List created event");
  },

  _handleNewTodoItem: function(event) {
    console.log("Todo Item created event");
  }

});
