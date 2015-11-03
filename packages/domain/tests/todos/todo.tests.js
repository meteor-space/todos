describe("Todos.Todo", function () {

  beforeEach(function () {
    this.data = {
      name: 'MyTodos'
    };
  });

  describe("creating a new todo items", function () {

    it("publishes a created event", function () {
      var guid = new Guid();
      Todos.domain.test(Todos.TodoItems).given()
        .when(
          new Todos.CreateTodoItems(_.extend({}, this.data, {
            targetId: guid
          }))
        )
        .expect([
          new Todos.TodoItemsCreated(_.extend({}, this.data, {
            sourceId: guid,
            timestamp: new Date(),
            version: 1
          }))
        ]);
    });

  });
});
