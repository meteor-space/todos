Space.ui.BlazeComponent.extend('Todos.Todo', {

  dependencies: {
    store: 'Todos.TodosStore',
    meteor: 'Meteor'
  },

  completedState() {
    return this.isCompleted ? 'completed' : '';
  },

  editingState() {
    let template = Template.instance();
    this.isEditing = this.store.editingTodoId() === template.data.id;
    if (this.isEditing) {
      if (template.view.isRendered) {
        template.$('.edit').focus().select();
      }
      return 'editing';
    } else {
      return '';
    }
  },

  events() {
    return [{
      'click .toggle': this._toggleTodo,
      'click .destroy': this._removeTodo,
      'dblclick .todo': this._editTodo,
      'blur .edit': this._stopEditing,
      'keyup .edit'(event) {
        switch (event.keyCode) {
          case 27: // escape key
            this._stopEditing(event);
            break;
          case 13: // enter key
            this._submitNewTitle(event);
            break;
        }
      }
    }];
  },

  _toggleTodo(event) {
    event.preventDefault();
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

  _removeTodo() {
    this.publish(new Todos.TodoRemoved({
      todoId: this.currentData().id
    }));
  },

  _editTodo() {
    this.publish(new Todos.TodoEditingStarted({
      todoId: this.currentData().id
    }));
  },

  _stopEditing() {
    this.publish(new Todos.TodoEditingEnded({
      todoId: this.currentData().id
    }));
  },

  _submitNewTitle(event) {
    let template = Template.instance();
    let id = template.data.id;
    let newTitle = event.currentTarget.value;
    this.publish(new Todos.TodoTitleChanged({
      todoId: id,
      newTitle: newTitle
    }));
    this._stopEditing();
  }

})
// Register blaze-component for template
.register('todo');

