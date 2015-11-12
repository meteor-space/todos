#!/usr/bin/env bash

export PACKAGE_DIRS='packages'

if [ "$PORT" ]; then
  spacejam test-packages packages/domain --port $PORT
else
   spacejam test-packages packages/domain
fi