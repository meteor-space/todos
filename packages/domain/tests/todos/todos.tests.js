describe("Todos.Todo", function () {

  beforeEach(function () {
    this.data = {
      title: 'MyTodo',
      isCompleted: new Boolean(false)
    };
  });

  describe("creating a new todo", function () {

    it("publishes a created event", function () {
      var guid = new Guid();
      Todos.domain.test(Todos.Todo).given()
      .when(
        new Todos.CreateTodo(_.extend({}, this.data, {
          targetId: guid
        }))
      )
      .expect([
        new Todos.TodoCreated(_.extend({}, this.data, {
          sourceId: guid,
          timestamp: new Date(),
          version: 1
        }))
      ]);

    });
  });
});
