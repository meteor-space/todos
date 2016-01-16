Space.flux.BlazeComponent.extend('Todos.Footer', {

  dependencies: {
    store: 'Todos.TodosStore',
    meteor: 'Meteor'
  },

  filters() {
    return this._mapAvailableFilters();
  },

  activeTodosCount() {
    let count = this.store.activeTodos().length;
    return count;
  },

  completedTodosCount() {
    return this.store.completedTodos().length;
  },

  pluralize(count) {
    if (count === 1) {
      return 'item';
    } else {
      return 'items';
    }
  },

  events() {
    return [{
      'click .clear-completed'() {
        if (this.store.completedTodos().length > 0) {
          for (let todo of this.store.completedTodos()) {
            this.publish(new Todos.TodoRemoved({
              todoId: todo.id
            }));
          }
        }
      }
    }];
  },

  hasAnyTodos() {
    return this.store.allTodos().length > 0;
  },

  _mapAvailableFilters() {
    let activeFilter = this.store.activeFilter();
    return _.map(this.store.FILTERS, function(key) {
      return {
        name: key[0].toUpperCase() + key.slice(1),
        path: key,
        selected: activeFilter === key ? 'selected' : ''
      };
    });
  }

})

.register('footer'); // BlazeComponent API to register with template
