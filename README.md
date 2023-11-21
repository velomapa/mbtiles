# Repository with different mbtiles stuff

* Server - https://maplibre.org/martin/introduction.html

## Docker in dev

```bash
docker run \
  -p 3000:3000 \
  -v data-mbtiles:/data-mbtiles \
  ghcr.io/maplibre/martin /data-mbtiles
```

## Running docker in prod

```bahs
bash ./run_martin.sh
```

## Nginx config

```bash
 sudo vim /etc/nginx/sites-enabled/default
```
