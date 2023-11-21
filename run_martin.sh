#!/bin/bash
set -e

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

docker stop $(docker ps -a -q --filter ancestor=ghcr.io/maplibre/martin)

# -d detached mode
docker run \
  -d \
  --rm \
  --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  -v "$(pwd)/data-mbtiles":/data-mbtiles \
  ghcr.io/maplibre/martin /data-mbtiles
