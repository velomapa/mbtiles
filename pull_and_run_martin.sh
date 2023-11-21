#!/bin/bash
set -e

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

git pull

if [[ $(docker ps -a -q --filter ancestor=ghcr.io/maplibre/martin) ]]
then
  docker stop $(docker ps -a -q --filter ancestor=ghcr.io/maplibre/martin)
  docker rm $(docker ps -a -q --filter ancestor=ghcr.io/maplibre/martin)
fi

# -d detached mode
docker run \
  -d \
  --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  -v "$(pwd)/data-mbtiles":/data-mbtiles \
  ghcr.io/maplibre/martin /data-mbtiles
