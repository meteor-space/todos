Space.messaging.Publication.extend(Todos, 'TodosPublication', {

  dependencies: {
    todosCollection: 'Todos.Todos'
  },

  publications() {
    return [{
      'todos': function(context, todoListId) {
        return this.todosCollection.find({_id: todoListId});
      }
    }];
  }
});
