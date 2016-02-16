#!/usr/bin/env bash
customEnv="./environment.sh"
if [ -e "$customEnv" ]; then
  echo "Loading $customEnv"
  source $customEnv
fi

if [ "$PORT" ]; then
  meteor --port $PORT --allow-incompatible-update
else
  meteor --allow-incompatible-update
fi
