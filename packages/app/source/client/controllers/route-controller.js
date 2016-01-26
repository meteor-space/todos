Space.Object.extend('Todos.RouteController', {

  mixin: [
    Space.messaging.EventSubscribing
  ],

  dependencies: {
    router: 'Router'
  },

  eventSubscriptions() {
    return [{
      'Todos.RouteRequested'(event) {
        let route = this.router.current();
        let mergedParams = _.deepExtend({}, route.params, event.params);
        let mergedQuery = _.deepExtend({}, route.queryParams, event.query);
        this.router.go(
          this.router.path(event.routeName, mergedParams, mergedQuery)
        );
      }
    }];
  }

});