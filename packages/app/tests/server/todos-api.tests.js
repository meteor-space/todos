describe('Todos.Api', function() {

  it('receives a command for creating todo list and sends it on the server-side command bus when valid', function() {

    let myCommand = new Todos.CreateTodoList({
      targetId: new Guid(),
      version: 1,
      name: 'MyTodos'
    });

    Todos.App.test(Todos.TodosApi)
      .send(myCommand)
      .expect([myCommand]);
  });

});
