Space.ui.defineEvents('Todos', {

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

  TodoReopened: {
    todoId: String
  },

  TodoCompleted: {
    todoId: String
  },

  TodoRemoved: {
    todoId: String
  },

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
