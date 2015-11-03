Package.describe({
  name: 'todos:base',
  version: '0.1.0',
  summary: 'Namespace for the Todos Space Application',
  git: 'https://github.com/meteor-space/todos.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {

  api.versionsFrom('1.2.1');

  api.use([
    'check',
    'space:messaging@2.1.0',
  ]);

  // SHARED
  api.addFiles([
    'source/namespace.js',
  ]);

  // SERVER ONLY
  api.addFiles([
    'source/server/value-objects/todo.js',
    'source/server/events.js',
    'source/server/commands.js'
  ], 'server');

  api.export('Todos');

});