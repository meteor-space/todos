describe("Todos.Todo", function() {

  beforeEach(function() {
    this.todoListId = new Guid();
    this.todoListData = {
      name: 'MyTodos'
    };
    this.todoItemdata = {
      title: 'My Todo',
      isCompleted: false
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
          new Todos.CreateTodo(_.extend({}, this.todoItemdata, {
            targetId: this.todoListId
          }))
        )
        .expect([
          new Todos.TodoCreated(_.extend({}, this.todoItemdata, {
            sourceId: this.todoListId,
            timestamp: new Date(),
            version: 2
          }))
        ]);
    });
  });

});
