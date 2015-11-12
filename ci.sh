#!/usr/bin/env bash

export PACKAGE_DIRS='packages'

if [ "$PORT" ]; then
  spacejam test-packages ./ --port $PORT
else
   spacejam test-packages ./
fi