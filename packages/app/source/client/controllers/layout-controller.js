Space.Object.extend(Todos, 'LayoutController', {

  dependencies: {
    layout: 'Layout',
    _: 'underscore'
  },

  Constructor() {
    this._currentLayout = null;
    this._currentSections = {};
  },

  eventSubscriptions() {
    return [{
      'Todos.RouteTriggered': function(event) {
        switch (event.routeName) {
        //case 'routeName': this._routeHanlder(); break;
        default: this._renderLandingPage();
        }
      }
    }];
  },

  _renderLandingPage() {
    this._render("layout", { main: "landing_page" });
  },

  _render(layout, sections) {
    this._currentLayout = layout;
    this._.extend(this._currentSections, sections);
    this.layout.render(this._currentLayout, this._currentSections);
  },

  _updateSections(sections) {
    this._render(this._currentLayout, sections);
  }

});

Todos.LayoutController.mixin([
  Space.messaging.EventSubscribing
]);
