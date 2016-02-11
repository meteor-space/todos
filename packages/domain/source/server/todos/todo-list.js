Space.eventSourcing.Aggregate.extend('Todos.TodoList', {

  fields: {
    name: String,
    todos: [Todos.TodoItem]
  },

  commandMap() {
    return {
      'Todos.CreateTodoList': this._createTodoList,
      'Todos.CreateTodo': this._createTodo,
      'Todos.CompleteTodo': this._completeTodo,
      'Todos.ReopenTodo': this._reopenTodo,
      'Todos.RemoveTodo': this._removeTodo,
      'Todos.ChangeTodoTitle': this._changeTodoTitle
    };
  },

  eventMap() {
    return {
      'Todos.TodoListCreated': this._onTodoListCreated,
      'Todos.TodoCreated': this._onTodoCreated,
      'Todos.TodoCompleted': this._onTodoCompleted,
      'Todos.TodoReopened': this._onTodoReopened,
      'Todos.TodoRemoved': this._onTodoRemoved,
      'Todos.TodoTitleChanged': this._onTodoTitleChanged
    };
  },

  // ============= COMMAND HANDLERS =============

  _createTodoList(command) {
    let eventProps = this._eventPropsFromCommand(command);
    eventProps.todos = [];
    console.log(eventProps)
    this.record(new Todos.TodoListCreated(eventProps));
  },

  _createTodo(command) {
    let todo = new Todos.TodoItem({
      id: new Guid(),
      title: command.title,
      isCompleted: false
    });

    this.record(new Todos.TodoCreated({
      sourceId: command.targetId,
      todo: todo
    }));
  },

  _completeTodo(command) {

    let todo = this._getTodoById(command.todoId);

    if (todo instanceof Todos.TodoItem && todo.isCompleted === true) {
      throw new Todos.TodoCannotBeCompleted();
    } else {
      this.record(new Todos.TodoCompleted(this._eventPropsFromCommand(command)));
    }

  },

  _reopenTodo(command) {

    let todo = this._getTodoById(command.todoId);

    if (todo instanceof Todos.TodoItem && todo.isCompleted === false) {
      throw new Todos.TodoCannotBeReopened();
    } else {
      this.record(new Todos.TodoReopened(this._eventPropsFromCommand(command)));
    }

  },

  _removeTodo(command) {
    // _getTodoById throws error if todo is not found
    let todo = this._getTodoById(command.todoId);
    this.record(new Todos.TodoRemoved(this._eventPropsFromCommand(command)));
  },

  _changeTodoTitle(command) {
    this.record(new Todos.TodoTitleChanged(this._eventPropsFromCommand(command)));
  },

  // ============= EVENT HANDLERS ============

  _onTodoListCreated(event) {
    this._assignFields(event);
  },

  _onTodoCreated(event) {
    this.todos.push(event.todo);
  },

  _onTodoCompleted(event) {
    let todo = this._getTodoById(event.todoId);
    todo.isCompleted = true;
  },

  _onTodoReopened(event) {
    let todo = this._getTodoById(event.todoId);
    todo.isCompleted = false;
  },

  _onTodoRemoved(event) {
    let todoId = event.todoId;
    let todo = this._getTodoById(todoId);
    this.todos = _.without(this.todos, todo);
  },

  _onTodoTitleChanged(event) {
    let todo = this._getTodoById(event.todoId);
    todo.title = event.newTitle;
  },

  // ============= HELPERS ============

  _getTodoById(id) {
    let foundTodo = null;
    for (let todo of this.todos) {
      if (todo.getId().equals(id)) {
        foundTodo = todo;
      }
    }
    if (foundTodo === null) {
      throw new Todos.TodoNotFoundError(id);
    }
    return foundTodo;
  }
});

Todos.TodoList.registerSnapshotType(`Todos.TodoListSnapshot`);
