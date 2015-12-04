Space.flux.BlazeComponent.extend(Todos, 'Footer', {

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
      'click #clear-completed'() {
        this.publish(new Todos.CompletedTodosCleared());
      }
    }];
  },

  _mapAvailableFilters() {
    return _.map(this.store.FILTERS, function(key) {
      return {
        name: key[0].toUpperCase() + key.slice(1),
        path: key
      };
    });
  }
})

.register('footer'); // BlazeComponent API to register with template
