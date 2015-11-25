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
    'ecmascript',
    'space:messaging@2.1.0',
    'space:domain@0.1.0'
  ]);

  // SHARED
  api.addFiles([
    'source/shared/namespace.js',
    'source/shared/api-commands.js',
  ]);

  // SERVER ONLY
  api.addFiles([
    'source/server/errors.js',
    'source/server/events.js',
    'source/server/entities/todo-item.js'
  ], 'server');

  api.export('Todos');

});
