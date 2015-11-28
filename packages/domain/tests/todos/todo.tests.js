describe("Todos.Todo", function() {

  beforeEach(function() {

    this.todoListId = new Guid();

    this.todoId = new Guid();

    this.todoListData = {
      name: 'MyTodos',
    };

    this.newTodoData = {
      title: 'My Todo',
      id: new Guid(),
      isCompleted: false
    };

    this.completedTodoData = {
      title: 'My Todo',
      id: new Guid(),
      isCompleted: true
    };
  });

  describe("creating a new todo list", function() {

    it("publishes a todo list created event", function() {
      Todos.domain.test(Todos.TodoList)
        .given()
        .when(
          new Todos.CreateTodoList(_.extend({}, this.todoListData, {
            targetId: this.todoListId
          }))
        )
        .expect([
          new Todos.TodoListCreated(_.extend({}, this.todoListData, {
            sourceId: this.todoListId,
            timestamp: new Date(),
            version: 1
          }))
        ]);
    });
  });

  describe("creating a new todo", function() {

    let todoListCreated = function() {
      return new Todos.TodoListCreated(_.extend({}, this.todoListData, {
        sourceId: this.todoListId,
        version: 1
      }));
    };

    it("publishes a todo created event", function() {
      Todos.domain.test(Todos.TodoList)
        .given([todoListCreated.call(this)])
        .when(
          new Todos.CreateTodo(_.extend({}, this.newTodoData, {
            targetId: this.todoListId
          }))
        )
        .expect([
          new Todos.TodoCreated(_.extend({}, this.newTodoData, {
            sourceId: this.todoListId,
            timestamp: new Date(),
            version: 2
          }))
          //TODO: Should I check if todo item in array in aggregate instance?
        ]);
    });
  });

  describe("completing todo", function() {

    let todoListWithUncompleteTodo = function() {

      let listCreated = new Todos.TodoListCreated(_.extend({}, this.todoListData, {
        sourceId: this.todoListId,
        version: 1
      }));

      let todoCreated = new Todos.TodoCreated(_.extend({}, this.newTodoData, {
        sourceId: this.todoListId,
        version: 2,
        id: this.todoId
      }));

      return [listCreated, todoCreated];
    };


    it("completes todo", function() {
      Todos.domain.test(Todos.TodoList)
        .given(todoListWithUncompleteTodo.call(this))
        .when([
          new Todos.CompleteTodo(_.extend({}, {
            targetId: this.todoListId,
            todoId: this.todoId
          }))]
        )
        .expect([
          new Todos.TodoCompleted(_.extend({}, {
            sourceId: this.todoListId,
            timestamp: new Date(),
            version: 2,
            todoId: this.todoId
          }))
        ]);
    });

    let todoListWithCompletedTodo = function() {

      let listCreated = new Todos.TodoListCreated(_.extend({}, this.todoListData, {
        sourceId: this.todoListId,
        version: 1
      }));

      let todoCreated = new Todos.TodoCreated(_.extend({}, this.completedTodoData, {
        sourceId: this.todoListId,
        version: 2,
        id: this.todoId,
      }));

      return [listCreated, todoCreated];
    };

    it("does not allow completion of completed todos", function() {
      Todos.domain.test(Todos.TodoList)
        .given(todoListWithCompletedTodo.call(this))
        .when([
          new Todos.CompleteTodo(_.extend({}, {
            targetId: this.todoListId,
            todoId: this.todoId
          }))]
        )
        .expect([
          new Space.domain.Exception({
            thrower: 'Todos.TodoList',
            error: new Todos.TodoCannotBeCompleted()
          })
        ]);
    });

    it("reopens todo", function() {
      Todos.domain.test(Todos.TodoList)
        .given(todoListWithCompletedTodo.call(this))
        .when([
          new Todos.ReopenTodo(_.extend({}, {
            targetId: this.todoListId,
            todoId: this.todoId
          }))]
        )
        .expect([
          new Todos.TodoReopened(_.extend({}, {}, {
            sourceId: this.todoListId,
            timestamp: new Date(),
            version: 2,
            todoId: this.todoId
          }))
        ]);
    });

    it("does not allow reopening already open todo", function() {
      Todos.domain.test(Todos.TodoList)
        .given(todoListWithUncompleteTodo.call(this))
        .when([
          new Todos.ReopenTodo(_.extend({}, {}, {
            targetId: this.todoListId,
            todoId: this.todoId
          }))]
        )
        .expect([
          new Space.domain.Exception({
            thrower: 'Todos.TodoList',
            error: new Todos.TodoCannotBeReopened()
          })
        ]);
    });

  });

});
