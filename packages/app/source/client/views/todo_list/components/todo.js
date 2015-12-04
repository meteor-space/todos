
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

Template.todo.onCreated(function() {
  this.getTitleValue = _.bind(function() {
    return this.$('.edit').val();
  }, this);
});

Template.todo.helpers({

  completedState() {
    return this.isCompleted ? 'completed' : '';
  },

  editingState() {
    if(this.isEditing) {
      var template = Template.instance();
      if(template.view.isRendered) {
        template.$('.edit').focus().select();
      }
      return 'editing';
    }
    else {
      return '';
    }
  }
});

Template.todo.events({

  'click .toggle'(event, template) {
    template.$(template.firstNode).trigger('toggled');
  },

  'click .destroy'(event, template) {
    template.$(template.firstNode).trigger('destroyed');
  },

  'dblclick .todo'(event, template) {
    template.$(template.firstNode).trigger('doubleClicked');
  },

  'blur .edit'(event, template) {
    template.$(template.firstNode).trigger('editingCanceled');
  },

  'keyup .edit'(event, template) {

    switch(event.keyCode) {
      case ESCAPE_KEY:
        template.$(template.firstNode).trigger('editingCanceled');
        break;
      case ENTER_KEY:
        template.$(template.firstNode).trigger('editingCompleted');
        break;
    }
  }
});
