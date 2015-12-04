Space.messaging.define(Space.messaging.Event, 'Todos', {

  // ======= Routing =======
  RouteRequested: {
    routeName: String,
    params: Match.Optional(Object)
  },

  RouteTriggered: {
    routeName: String,
    params: Match.Optional(Object)
  },

  // ======= UI events =======

  TodoCreated: {
    title: String
  },

  TodoToggled: {
    id: String,
    isCompleted: Boolean
  },

  TodoRemoved: {
    todoId: String
  },

  AllTodosToggled: {},

  CompletedTodosCleared: {},

  TodoEditingStarted: {
    todoId: String
  },

  TodoTitleChanged: {
    todoId: String,
    newTitle: String
  },

  TodoEditingEnded: {
    todoId: String
  }


});
