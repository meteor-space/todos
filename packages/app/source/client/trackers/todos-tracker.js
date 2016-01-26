Space.messaging.Tracker.extend('Todos.TodosTracker', {

  dependencies: {
    store: 'Todos.TodosStore',
    meteor: 'Meteor'
  },

  // Reactively subscribe to the todos data based on configured list id
  autorun() {
    this.meteor.subscribe('todos', this.store.configuration.todoListId.toString());
  }

});
