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
    todo.isEditing = this.store.editingTodoId() === todo._id;
    return todo;
  },

  events() {
    return [{
      'toggled .todo': this.toggleTodo,
      'destroyed .todo': this.deleteTodo,
      'doubleClicked .todo': this.editTodo,
      'editingCanceled .todo': this.stopEditing,
      'editingCompleted .todo': this.submitNewTitle,
      'click #toggle-all': this.toggleAllTodos
    }];
  },

  toggleTodo() {
    this.publish(new Todos.TodoToggled({
      id: this.currentData().id,
      isCompleted: this.currentData().isCompleted
    }));
  },

  deleteTodo() {
    this.publish(new Todos.TodoDeleted({
      todoId: this.currentData()._id
    }));
  },

  editTodo() {
    this.publish(new Todos.TodoEditingStarted({
      todoId: this.currentData()._id
    }));
  },

  submitNewTitle(event) {
    let todo = Space.flux.getEventTarget(event);
    let newTitle = todo.getTitleValue();
    this.publish(new Todos.TodoTitleChanged({
      todoId: todo.data._id,
      newTitle: newTitle
    }));
    this.stopEditing();
  },

  toggleAllTodos() {
    this.meteor.call('toggleAllTodos');
  },

  stopEditing() {
    this.publish(new Todos.TodoEditingEnded({
      todoId: this.currentData()._id
    }));
  }
})
// Register blaze-component for template
.register('todo_list');
