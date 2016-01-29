Package.describe({
  name: 'todos:domain',
  version: '0.1.0',
  summary: 'Domain Bounded context for sample Todos application',
  git: 'https://github.com/meteor-space/todos.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {

  api.versionsFrom('1.2.1');

  api.use([
    'mongo',
    'check',
    'ecmascript',
    'underscore',
    'space:event-sourcing@3.0.0',
    'todos:base'
  ]);

  api.addFiles([
    'source/server/module.js',
    // TODO ITEMS
    'source/server/todos/todo-list.js',
    'source/server/todos/todo-router.js',
  ], 'server');

});


Package.onTest(function(api) {

  api.use([
    'ecmascript',
    'mongo',
    'check',
    'underscore',
    'todos:base',
    'todos:domain',
    'space:testing@3.0.1',
    'space:testing-messaging@3.0.1',
    'space:testing-event-sourcing@3.0.0',
    'practicalmeteor:munit@2.1.5'
  ]);

  api.addFiles([
    'tests/todos/todo.tests.js',
  ], 'server');

});
