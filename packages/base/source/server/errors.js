
Space.Error.extend(Todos, 'TodoCannotBeCompleted', {
  message: 'Todo cannot be completed because it is already completed.'
});

Space.Error.extend(Todos, 'TodoCannotBeReopened', {
  message: 'Todo cannot be reopened because it is already open.'
});
