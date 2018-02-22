#!/bin/bash
set -e

# Start the services and wait for it.
pushd `dirname $0`
docker-compose up -d --build
STATUS=""
until [[ ${STATUS} = "healthy" ]]; do
  STATUS=`docker inspect --format='{{.State.Health.Status}}' eventcheckin_db`
  echo ${STATUS}
  sleep 5
done
popd
