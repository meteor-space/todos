Space.flux.BlazeComponent.extend(Todos, 'Input', {

  onExtending() {
    this.register('input');
  },

  events: function () {
    return [{
      'keyup #new-todo': function (event) {

        // When it was the ENTER key
        if (event.keyCode === 13) {

          // Tell mediator about it
          var input = this.$('#new-todo').val();
          this.publish(new Todos.TodoCreated({title: input}));

          // Reset input
          this.$('#new-todo').val('');
        }
      }
    }];
  }

});