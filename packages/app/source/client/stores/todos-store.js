Space.flux.Store.extend(Todos, 'TodosStore', {

  // The store needs a reference to the todos collection
  dependencies: {
    todos: 'Todos.Todos',
    configuration: 'configuration',
    //tracker: 'Todos.Tracker'
  },

  // Todos example specific properties
  FILTERS: {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
  },

  // ====== Public reactive data accessors ======= //

  // These methods can be used by other parts of the system to
  // fetch reactive data and auto-update when store data changes.

  reactiveVars() {
    return [{
      activeFilter: this.FILTERS.ALL
    }];
  },

  sessionVars() {
    return [{
      editingTodoId: null
    }];
  },

  filteredTodos() {
    switch (this.activeFilter()) {
      case this.FILTERS.ALL: return this.todos.find();
      case this.FILTERS.ACTIVE: return this.todos.find({ isCompleted: false});
      case this.FILTERS.COMPLETED: return this.todos.find({ isCompleted: true });
      default: this.todos.find();
    }
  },

  completedTodos() {
    return this.todos.findCompletedTodos();
  },

  activeTodos() {
    return this.todos.findActiveTodos();
  },

});
