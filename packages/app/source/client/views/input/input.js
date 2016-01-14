Space.flux.BlazeComponent.extend('Todos.Input', {

  onExtending() {
    this.register('input');
  },

  events() {
    return [{
      'keyup .new-todo'(event) {

        // When it was the ENTER key
        if (event.keyCode === 13) {
          // If the title is not empty send TodoCreated event
          var input = this.$('.new-todo').val().trim();

          if (input.length) {
            this.publish(new Todos.TodoCreated({
              title: input
            }));

            // Reset input
            this.$('.new-todo').val('');
          }
        }
      }
    }];
  }

});
