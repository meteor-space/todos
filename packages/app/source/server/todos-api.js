Todos.TodosApi = Space.messaging.Api.extend(Todos, 'TodosApi', {

  dependencies: {
    meteor: 'Meteor'
  },

  methods() {
    return [{
      'Todos.CreateTodoList'(context, command) {
        this.commandBus.send(command);
      }
    }];
  }

});
