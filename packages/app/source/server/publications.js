Space.messaging.Publication.extend('Todos.TodosPublication', {

  dependencies: {
    todosCollection: 'Todos.TodoLists'
  },

  publications() {
    return [{
      'todos': function(context, todoListId) {
        return this.todosCollection.find({_id: todoListId});
      }
    }];
  }
});
