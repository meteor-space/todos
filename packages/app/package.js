Package.describe({
  name: 'todos:app',
  version: '0.1.0',
  summary: 'Todos - demo application based on Space',
  git: 'https://github.com/meteor-space/todos.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {

  api.versionsFrom('1.2.1');

  api.use([
    'meteor-base',
    'standard-minifiers',
    'templating',
    'blaze-html-templates',
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
    'todos:domain'
  ]);

  // SERVER Configuration
  api.addFiles([
    'source/server/application.js'
  ], 'server');

  // CLIENT Configuration
  api.addFiles([
    'source/client/application.js'
  ], 'client');

  // Startup
  api.addFiles([
    'source/startup.js',
  ]);

});

Package.onTest(function(api) {

  api.use([
    'mongo',
    'todos:app',
    'practicalmeteor:munit@2.1.5',
    'space:testing@2.0.0',
  ]);

});
