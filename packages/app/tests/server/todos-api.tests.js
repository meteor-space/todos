describe('Todos.Api', function() {

  beforeEach(function() {

    this.todoListId = new Guid();

    this.createTodoListCommand = new Todos.CreateTodoList({
      targetId: this.todoListId,
      name: 'MyTodos'
    });

    // TODO: Add other tests from repo history after API BDD testing API update

  });

  it('receives a command for creating a todo list and sends it on the server-side command bus when valid', function() {

    Todos.App.test(Todos.TodosApi)
      .send(this.createTodoListCommand)
      .expect([this.createTodoListCommand]);
  });

  // TODO: Add other tests from repo history after API BDD testing API update

});
