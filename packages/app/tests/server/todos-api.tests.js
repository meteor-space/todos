describe('Todos.Api', function() {

  beforeEach(function() {

    this.todoListId = new Guid();

    this.uncompletedTodoId = new Guid();
    this.completedTodoId = new Guid();

    this.createTodoListCommand = new Todos.CreateTodoList({
      targetId: this.todoListId,
      name: 'MyTodos',
      version: 1
    });

    this.todoListCreatedEvent = new Todos.TodoListCreated({
      sourceId: this.todoListId,
      name: 'MyTodos'
    });

    this.createUncompletedTodo = new Todos.CreateTodo({
      targetId: this.todoListId,
      id: this.uncompletedTodoId,
      title: 'My Todo',
      isCompleted: false,
      version: 2
    });

    this.uncompletedTodoCreatedEvent = new Todos.TodoCreated({
      sourceId: this.todoListId,
      id: this.uncompletedTodoId,
      title: 'My Todo',
      isCompleted: false
    });

    this.createCompletedTodo = new Todos.CreateTodo({
      targetId: this.todoListId,
      id: this.completedTodoId,
      title: 'My Todo',
      isCompleted: false,
      version: 2
    });

    this.completedTodoCreatedEvent = new Todos.TodoCreated({
      sourceId: this.todoListId,
      id: this.completedTodoId,
      title: 'My Todo',
      isCompleted: true
    });

  });

  it('receives a command for creating a todo list and sends it on the server-side command bus when valid', function() {

    Todos.App.test(Todos.TodosApi)
      .send(this.createTodoListCommand)
      .expect([this.createTodoListCommand]);
  });

  it('receives a command for creating a todo and sends it on the server-side command bus when valid', function() {

    Todos.App.test(Todos.TodosApi)
      .given([this.todoListCreatedEvent])
      .send(this.createUncompletedTodo)
      .expect([this.createUncompletedTodo]);
  });

  it('receives a command for completing a todo and sends it on the server-side command bus when valid', function() {

    let completeTodoCommand = new Todos.CompleteTodo({
      targetId: this.todoListId,
      todoId: this.uncompletedTodoId
    });

    Todos.App.test(Todos.TodosApi)
      .given([this.todoListCreatedEvent, this.uncompletedTodoCreatedEvent])
      .send(completeTodoCommand)
      .expect([completeTodoCommand]);
  });

  it('receives a command for completing a todo and sends it on the server-side command bus when todo is already completed and expects an error', function() {

    let completeTodoCommand = new Todos.CompleteTodo({
      targetId: this.todoListId,
      todoId: this.completedTodoId
    });

    Todos.App.test(Todos.TodosApi)
      .given([this.todoListCreatedEvent, this.completedTodoCreatedEvent])
      .send(completeTodoCommand)
      .expectToFailWith(new Todos.TodoCannotBeCompleted());
  });

  it('receives a command for reopening a todo and sends it on the server-side command bus when valid', function() {

    let reopenTodoCommand = new Todos.ReopenTodo({
      targetId: this.todoListId,
      todoId: this.completedTodoId
    });

    Todos.App.test(Todos.TodosApi)
      .given([this.todoListCreatedEvent, this.completedTodoCreatedEvent])
      .send(reopenTodoCommand)
      .expect([reopenTodoCommand]);
  });

  it('receives a command for reopening a todo and sends it on the server-side command bus when todo is already open and expects an error', function() {

    let reopenTodoCommand = new Todos.ReopenTodo({
      targetId: this.todoListId,
      todoId: this.uncompletedTodoId
    });

    Todos.App.test(Todos.TodosApi)
      .given([this.todoListCreatedEvent, this.uncompletedTodoCreatedEvent])
      .send(reopenTodoCommand)
      .expectToFailWith(new Todos.TodoCannotBeReopened());
  });

});
