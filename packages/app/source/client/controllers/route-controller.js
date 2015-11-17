Space.Object.extend(Todos, 'RouteController', {

  dependencies: {
    router: 'Router'
  },

  eventSubscriptions() {
    return [{
      'Todos.RouteRequested'(event) {
        console.log('Route requested');
        console.dir(event);
        this.router.go(this.router.path(event.routeName));
      }
    }];
  }

});

Todos.RouteController.mixin([
  Space.messaging.EventSubscribing
]);
