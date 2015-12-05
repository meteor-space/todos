Space.flux.Store.extend(Todos, 'TodosStore', {

  // The store needs a reference to the todos collection
  dependencies: {
    todos: 'Todos.TodoLists',
    configuration: 'configuration',
  },

  // Todos example specific properties
  FILTERS: {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
  },

  // ====== Event handling setup ====== //

  // Map private methods to events coming from the outside
  // this is the only way state can change within the store.

  eventSubscriptions() {
    return [{
      'Todos.RouteTriggered': this._changeActiveFilter,
      'Todos.TodoEditingStarted': this._setEditingTodoId,
      'Todos.TodoEditingEnded': this._unsetEditingTodoId
    }];
  },

  // ====== Public reactive data accessors ======= //

  // These methods can be used by other parts of the system to
  // fetch reactive data and auto-update when store data changes.

  reactiveVars() {
    return [{
      activeFilter: this.FILTERS.ACTIVE,
      todoListDocument: {}
    }];
  },

  sessionVars() {
    return [{
      editingTodoId: null
    }];
  },

  computations() {
    return [
      this._calcTodoListDocument
    ];
  },

  _calcTodoListDocument() {
    let todoListId = this.configuration.todoListId.toString();
    let todoListDocument = this.todos.findOne({_id: todoListId});
    this._setReactiveVar('todoListDocument', todoListDocument);
  },

  filteredTodos() {
    if (this.todoListDocument()) {
      switch (this.activeFilter()) {
      case this.FILTERS.ALL: return this.todoListDocument().todos;
      case this.FILTERS.ACTIVE: return this._getTodosByState(false);
      case this.FILTERS.COMPLETED: return this._getTodosByState(true);
      default: return this.todoListDocument().todos;
      }
    } else {
      return [];
    }
  },

  activeTodos() {
    if (this.todoListDocument()) {
      return this._getTodosByState(false);
    } else {
      return [];
    }
  },

  completedTodos() {
    if (this.todoListDocument()) {
      return this._getTodosByState(true);
    } else {
      return [];
    }
  },

  allTodos() {
    return this._getAllTodos();
  },

  _changeActiveFilter(event) {
    if (event.params.filter) {
      this._setReactiveVar('activeFilter', event.params.filter);
    } else {
      this._setReactiveVar('activeFilter', this.FILTERS.ALL);
    }

  },

  _setEditingTodoId(event) {
    this._setSessionVar('editingTodoId', event.todoId);
  },

  _unsetEditingTodoId() {
    this._setSessionVar('editingTodoId', null);
  },

  // ============= HELPERS ============

  _getTodosByState(isCompleted) {
    let foundTodos = [];
    if (this.todoListDocument()) {
      for (let todo of this.todoListDocument().todos) {
        if (todo.isCompleted === isCompleted) {
          foundTodos.push(todo);
        }
      }
    }
    return foundTodos;
  },

  _getAllTodos() {
    let foundTodos = [];
    if (this.todoListDocument()) {
      for (let todo of this.todoListDocument().todos) {
        foundTodos.push(todo);
      }
    }
    return foundTodos;
  }

});
