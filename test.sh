source ./environment.sh # Customize environment

export PACKAGE_DIRS='packages'

if [ "$PORT" ]; then
  meteor test-packages packages/domain --port $PORT
else
   meteor test-packages packages/domain
fi
