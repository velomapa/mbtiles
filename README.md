# Repository with different mbtiles stuff

* Server - https://maplibre.org/martin/introduction.html

## Docker

```bash
docker run \
  -p 3000:3000 \
  -v ./data-mbtiles:/data-mbtiles \
  ghcr.io/maplibre/martin /data-mbtiles
```
