Space.flux.BlazeComponent.extend(Todos, 'TodoList', {

  dependencies: {
    store: 'Todos.TodosStore',
    meteor: 'Meteor'
  },

  todos() {
    return this.store.filteredTodos();
  },

  hasAnyTodos() {
    return this.store.filteredTodos().length > 0;
  },

  allTodosCompleted() {
    return this.store.activeTodos().lenght === 0;
  },

  isToggleChecked() {
    if (this.hasAnyTodos() && this.allTodosCompleted()) {
      return 'checked';
    } else {
      return false;
    }
  },

  prepareTodoData() {
    todo = this.currentData();
    todo.isEditing = this.store.editingTodoId() === todo.id;
    return todo;
  },

  events() {
    return [{
      'toggled .todo': this.toggleTodo,
      'destroyed .todo': this.removeTodo,
      'doubleClicked .todo': this.editTodo,
      'editingCanceled .todo': this.stopEditing,
      'editingCompleted .todo': this.submitNewTitle,
      'click #toggle-all': this.toggleAllTodos
    }];
  },

  toggleTodo() {
    if (this.currentData().isCompleted) {
      this.publish(new Todos.TodoReopened({
        todoId: this.currentData().id
      }));
    } else {
      this.publish(new Todos.TodoCompleted({
        todoId: this.currentData().id
      }));
    }
  },

  removeTodo() {
    this.publish(new Todos.TodoRemoved({
      todoId: this.currentData().id
    }));
  },

  editTodo() {
    this.publish(new Todos.TodoEditingStarted({
      todoId: this.currentData().id
    }));
  },

  submitNewTitle(event) {
    let todo = Space.flux.getEventTarget(event);
    let newTitle = todo.getTitleValue();
    this.publish(new Todos.TodoTitleChanged({
      todoId: todo.data.id,
      newTitle: newTitle
    }));
    this.stopEditing();
  },

  toggleAllTodos() {
    this.publish(new Todos.AllTodosToggled());
  },

  stopEditing() {
    this.publish(new Todos.TodoEditingEnded({
      todoId: this.currentData().id
    }));
  }
})
// Register blaze-component for template
.register('todo_list');
