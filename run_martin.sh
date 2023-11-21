#!/bin/bash
set -e

# -d detached mode
docker run \
  -d --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  -v data-mbtiles:/data-mbtiles \
  ghcr.io/maplibre/martin /data-mbtiles
