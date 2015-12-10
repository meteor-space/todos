Space.flux.BlazeComponent.extend(Todos, 'TodoList', {

  dependencies: {
    store: 'Todos.TodosStore',
    meteor: 'Meteor'
  },

  todos() {
    return this.store.filteredTodos();
  },

  hasAnyTodos() {
    return this.store.filteredTodos().length > 0;
  },

  allTodosCompleted() {
    return this.store.activeTodos().lenght === 0;
  },

  isToggleChecked() {
    if (this.hasAnyTodos() && this.allTodosCompleted()) {
      return 'checked';
    } else {
      return false;
    }
  },

  prepareTodoData() {
    let todo = this.currentData();
    return todo;
  },

  events() {
    return [{
      'click .toggle-all': this.toggleAllTodos
    }];
  },

  toggleAllTodos() {
    switch (this.store.activeFilter()) {
      case this.store.FILTERS.ALL:
        if (this.store.activeTodos().length > 0) {
          return this._completeOpenTodos();
        } else {
          return this._reopenCompleteTodos();
        }
      case this.store.FILTERS.ACTIVE:
        return this._completeOpenTodos();
      case this.store.FILTERS.COMPLETED:
        return this._reopenCompleteTodos();
    }
  },

  _completeOpenTodos() {
    for (let todo of this.store.activeTodos()) {
      this.publish(new Todos.TodoCompleted({
        todoId: todo.id
      }));
    }
  },

  _reopenCompleteTodos() {
    for (let todo of this.store.completedTodos()) {
      this.publish(new Todos.TodoReopened({
        todoId: todo.id
      }));
    }
  }

})
// Register blaze-component for template
.register('todo_list');
