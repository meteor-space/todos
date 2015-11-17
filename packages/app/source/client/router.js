// Don't start routing immediately -> we need to do that when our app starts!
FlowRouter.wait();

// Generates flow-router routes + generalized action that publishes events
let generateRoute = function(routeName) {
  return {
    name: routeName,
    action(params) {

      // Merge query into params
      let mergedParams = _.extend({}, params, params.query);

      // Cleanup params/query abstraction
      delete mergedParams.query;

      let routeTriggeredEvent = new Todos.RouteTriggered({
        routeName: routeName,
        params: mergedParams
      });

      Todos.app.publish(routeTriggeredEvent);
    }
  };
};

FlowRouter.route('/', generateRoute('landingPage'));
