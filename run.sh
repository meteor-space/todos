source ./environment.sh # Customize environment

if [ "$PORT" ]; then
  meteor --port $PORT --allow-incompatible-update
else
  meteor --allow-incompatible-update
fi
