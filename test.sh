#!/usr/bin/env bash
customEnv="./environment.sh"
if [ -e "$customEnv" ]; then
  echo "Loading $customEnv"
  source $customEnv
fi

export PACKAGE_DIRS='packages'

if [ "$PORT" ]; then
  meteor test-packages packages/domain packages/app --port $PORT
else
   meteor test-packages packages/domain packages/app
fi
