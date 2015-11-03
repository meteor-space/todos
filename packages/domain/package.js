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
    'space:event-sourcing@2.1.0',
    'todos:base'
  ]);

  api.addFiles([
    'source/server/module.js',
    // TODO ITEMS
    'source/server/todos/todo-items.js',
    'source/server/todos/todo-router.js',
  ], 'server');

});


Package.onTest(function(api) {

  api.use([
    'mongo',
    'underscore',
    'space:testing@2.0.0',
    'todos:base',
    'todos:domain',
    'practicalmeteor:munit@2.1.5',
  ]);

  api.addFiles([
    'tests/todos/todo.tests.js'
  ], 'server');

});
