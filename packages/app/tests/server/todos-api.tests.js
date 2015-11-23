describe('Todos.Api', function() {

  beforeEach(function() {
    this.todoListId = new Guid();
  });

  it('receives a command for creating todo list and sends it on the server-side command bus when valid', function() {

    let myCommand = new Todos.CreateTodoList({
      targetId: this.todoListId,
      version: 1,
      name: 'MyTodos'
    });

    Todos.App.test(Todos.TodosApi)
      .send(myCommand)
      .expect([myCommand]);
  });

  /*it('receives a command for creating todo and sends it on the server-side command bus when valid', function() {

    let myCommand = new Todos.CreateTodo({
      targetId: this.todoListId,
      version: 2,
      title: 'My Todo',
      id: new Guid()
    });

    Todos.App.test(Todos.TodosApi)
      .given() //TODO
      .send(myCommand)
      .expect([myCommand]);
  });*/

});
