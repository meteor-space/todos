describe("Todos.Todo", function() {

  beforeEach(function() {

    this.todoListId = new Guid();

    this.todoId = new Guid();

    this.todoListData = {
      name: 'MyTodos',
    };

    this.newTodoData = {
      title: 'My Todo',
      isCompleted: false
    };

    this.completedTodoData = {
      title: 'My Todo',
      todoId: new Guid(),
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
            sourceId: this.todoListId
          }))
        ]);
    });
  });

  describe("creating a new todo", function() {

    let todoListCreated = function() {
      return new Todos.TodoListCreated(_.extend({}, this.todoListData, {
        sourceId: this.todoListId
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
            todoId: Guid
          }))
        ]);
    });
  });

  describe("completing and reopening todo", function() {

    let todoListWithUncompleteTodo = function() {

      let listCreated = new Todos.TodoListCreated(_.extend({}, this.todoListData, {
        sourceId: this.todoListId
      }));

      let todoCreated = new Todos.TodoCreated(_.extend({}, this.newTodoData, {
        sourceId: this.todoListId,
        todoId: this.todoId
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
            todoId: this.todoId
          }))
        ]);
    });

    let todoListWithCompletedTodo = function() {

      let listCreated = new Todos.TodoListCreated(_.extend({}, this.todoListData, {
        sourceId: this.todoListId
      }));

      let todoCreated = new Todos.TodoCreated(_.extend({}, this.completedTodoData, {
        sourceId: this.todoListId,
        todoId: this.todoId
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


  describe("removing many todos", function() {

    let todo1Id = new Guid();
    let todo2Id = new Guid();
    let todo3Id = new Guid();
    let todo4Id = new Guid();
    let todo5Id = new Guid();
    let todo6Id = new Guid();
    let todo7Id = new Guid();
    let todo8Id = new Guid();

    let todoListWithTodo = function() {

      let listCreated = new Todos.TodoListCreated(_.extend({}, this.todoListData, {
        sourceId: this.todoListId
      }));

      let todoCreated1 = new Todos.TodoCreated(_.extend({}, this.newTodoData, {
        sourceId: this.todoListId,
        todoId: todo1Id
      }));

      let todoCreated2 = new Todos.TodoCreated(_.extend({}, this.newTodoData, {
        sourceId: this.todoListId,
        todoId: todo2Id
      }));

      let todoCreated3 = new Todos.TodoCreated(_.extend({}, this.newTodoData, {
        sourceId: this.todoListId,
        todoId: todo3Id
      }));

      let todoCreated4 = new Todos.TodoCreated(_.extend({}, this.newTodoData, {
        sourceId: this.todoListId,
        todoId: todo4Id
      }));

      let todoCreated5 = new Todos.TodoCreated(_.extend({}, this.newTodoData, {
        sourceId: this.todoListId,
        todoId: todo5Id
      }));

      let todoCreated6 = new Todos.TodoCreated(_.extend({}, this.newTodoData, {
        sourceId: this.todoListId,
        todoId: todo6Id
      }));

      let todoCreated7 = new Todos.TodoCreated(_.extend({}, this.newTodoData, {
        sourceId: this.todoListId,
        todoId: todo7Id
      }));

      let todoCreated8 = new Todos.TodoCreated(_.extend({}, this.newTodoData, {
        sourceId: this.todoListId,
        todoId: todo8Id
      }));

      return [listCreated, todoCreated1, todoCreated2, todoCreated3, todoCreated4, todoCreated5, todoCreated6, todoCreated7, todoCreated8];
    };

    it("removes 8 todos", function() {
      Todos.domain.test(Todos.TodoList)
        .given(todoListWithTodo.call(this))
        .when([
          new Todos.RemoveTodo(_.extend({}, {
            targetId: this.todoListId,
            todoId: todo1Id
          })),
          new Todos.RemoveTodo(_.extend({}, {
            targetId: this.todoListId,
            todoId: todo2Id
          })),
          new Todos.RemoveTodo(_.extend({}, {
            targetId: this.todoListId,
            todoId: todo3Id
          })),
          new Todos.RemoveTodo(_.extend({}, {
            targetId: this.todoListId,
            todoId: todo4Id
          })),
          new Todos.RemoveTodo(_.extend({}, {
            targetId: this.todoListId,
            todoId: todo5Id
          })),
          new Todos.RemoveTodo(_.extend({}, {
            targetId: this.todoListId,
            todoId: todo6Id
          })),
          new Todos.RemoveTodo(_.extend({}, {
            targetId: this.todoListId,
            todoId: todo7Id
          })),
          new Todos.RemoveTodo(_.extend({}, {
            targetId: this.todoListId,
            todoId: todo8Id
          }))
        ]
        )
        .expect([
          new Todos.TodoRemoved(_.extend({}, {
            todoId: this.todoId,
            sourceId: todo1Id
          })),
          new Todos.TodoRemoved(_.extend({}, {
            todoId: this.todoId,
            sourceId: todo2Id
          })),
          new Todos.TodoRemoved(_.extend({}, {
            todoId: this.todoId,
            sourceId: todo3Id
          })),
          new Todos.TodoRemoved(_.extend({}, {
            todoId: this.todoId,
            sourceId: todo4Id
          })),
          new Todos.TodoRemoved(_.extend({}, {
            todoId: this.todoId,
            sourceId: todo5Id
          })),
          new Todos.TodoRemoved(_.extend({}, {
            todoId: this.todoId,
            sourceId: todo6Id
          })),
          new Todos.TodoRemoved(_.extend({}, {
            todoId: this.todoId,
            sourceId: todo7Id
          })),
          new Todos.TodoRemoved(_.extend({}, {
            todoId: this.todoId,
            sourceId: todo8Id
          }))
        ]);
    });

    let unknownTodoId = new Guid();

    it("does not allow removing a todo that does not exist", function() {
      Todos.domain.test(Todos.TodoList)
        .given(todoListWithTodo.call(this))
        .when([
          new Todos.ReopenTodo(_.extend({}, {}, {
            targetId: this.todoListId,
            todoId: unknownTodoId
          }))]
        )
        .expect([
          new Space.domain.Exception({
            thrower: 'Todos.TodoList',
            error: new Todos.TodoNotFoundError(unknownTodoId)
          })
        ]);
    });

  });


  describe("renaming todo", function() {

    let todoListWithTodo = function() {

      let listCreated = new Todos.TodoListCreated(_.extend({}, this.todoListData, {
        sourceId: this.todoListId
      }));

      let todoCreated = new Todos.TodoCreated(_.extend({}, this.newTodoData, {
        sourceId: this.todoListId,
        todoId: this.todoId
      }));

      return [listCreated, todoCreated];
    };

    it("changes todo title", function() {
      Todos.domain.test(Todos.TodoList)
        .given(todoListWithTodo.call(this))
        .when([
          new Todos.ChangeTodoTitle(_.extend({}, {
            targetId: this.todoListId,
            todoId: this.todoId,
            newTitle: 'My new title'
          }))]
        )
        .expect([
          new Todos.TodoTitleChanged(_.extend({}, {
            todoId: this.todoId,
            sourceId: this.todoListId,
            newTitle: 'My new title'
          }))
        ]);
    });

  });

});
