Package.describe({
  name: 'todos:app',
  version: '0.1.0',
  summary: 'Todos - demo application based on Space',
  git: 'https://github.com/meteor-space/todos.git',
  documentation: 'README.md'
});

Package.onUse(function (api) {

  api.versionsFrom('1.2.1');

  api.imply([
    'todos:base'
  ]);

  api.use([
    'meteor-base',
    'standard-minifiers',
    'templating',
    'blaze-html-templates',
    'ecmascript',
    'spacebars',
    'mongo',
    'session',
    'check',
    'reactive-dict',
    'peerlibrary:blaze-components@0.15.0',
    'meteorhacks:flow-router@1.19.0',
    'kadira:blaze-layout@2.1.0',
    'meteorhacks:subs-manager@1.6.2',
    'space:base@3.1.0',
    'space:messaging@2.1.0',
    'space:event-sourcing@2.1.0',
    'space:flux@0.6.0',
    'todos:base',
    'todos:domain',
  ]);

  // SERVER Configuration
  api.addFiles([
    // PROJECTIONS
    'source/server/projections/todos-projection.js',
    // PUBLICATIONS
    'source/server/publications.js',
    'source/server/application.js',
  ], 'server');

  // SHARED configuration
  api.addFiles([
      'source/shared/todos-collection.js',
      'source/shared/apis/todos-api.js'
    ],
    ['client', 'server']
  );

  // CLIENT Configuration
  api.addFiles([
    // STYLES
    'source/client/client.css',
    // LAYOUTS
    'source/client/views/layout.html',
    // PAGES
    // --> index
    'source/client/views/index.html',
    // SECTIONS
    // --> footer
    'source/client/views/footer/footer.html',
    'source/client/views/footer/footer.js',
    // --> todos list
    'source/client/views/todo_list/todo_list.html',
    'source/client/views/todo_list/todo_list.js',
    // COMPONENTS
    //    --> todo
    'source/client/views/todo_list/components/todo.html',
    'source/client/views/todo_list/components/todo.js',
    // --> input
    'source/client/views/input/input.html',
    'source/client/views/input/input.js',
    // CONTROLLERS
    'source/client/controllers/route-controller.js',
    'source/client/controllers/layout-controller.js',
    'source/client/controllers/todos-controller.js',
    //STORES
    'source/client/stores/todos-store.js',
    // APP
    'source/client/events.js',
    'source/client/router.js',
    'source/client/trackers/todos-tracker.js',
    'source/client/application.js'
  ], 'client');

  // Startup
  api.addFiles([
    'source/startup.js',
  ]);



});

Package.onTest(function (api) {

  api.use([
    'mongo',
    'ecmascript',
    'space:testing@2.0.0',
    'todos:base',
    'todos:domain',
    'todos:app',
    'practicalmeteor:munit@2.1.5',
  ]);

  api.addFiles([
    'tests/server/todos-api.tests.js'
  ], 'server');

});
