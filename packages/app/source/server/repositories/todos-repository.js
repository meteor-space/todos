Space.Object.extend('Todos.TodosRepository', {

  dependencies: {
    todos: 'Todos.TodoLists'
  },

  createTodoList(listId, name, todos) {
    this.todos.insert({
      _id: listId.toString(),
      name: name,
      todos: []
    });
  },

  addTodo(listId, todoId, todo) {
    this.todos.update(listId.toString(), {
      $push: { todos: {
        id: todo.id.toString(),
        title: todo.title,
        isCompleted: todo.isCompleted
      }}
    });
  },

  completeTodo(listId, todoId) {
    this.todos.update({_id: listId.toString(), 'todos.id': todoId.toString()}, {
      $set: {
        'todos.$.isCompleted': true
      }
    });
  },

  reopenTodo(listId, todoId) {
    this.todos.update({_id: listId.toString(), 'todos.id': todoId.toString()}, {
      $set: {
        'todos.$.isCompleted': false
      }
    });
  },

  removeTodo(listId, todoId) {
    let removeTodo = {$pull:{todos: {id: todoId.toString()}}};
    this.todos.update({'_id': listId.toString()}, removeTodo);
  },

  changeTitle(listId, todoId, newTitle) {
    this.todos.update({_id: sourceId.toString(), 'todos.id': todoId.toString()}, {
      $set: {
        'todos.$.title': newTitle
      }
    });
  },

  isUniqueTodoByTitle(title){
    let result = this.todos.findOne({'todos.title': title}, {fields: {_id: 1}})
    return (result === undefined)
  }

});

