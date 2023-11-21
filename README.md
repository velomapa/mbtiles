# Repository with different mbtiles stuff

* Server - https://maplibre.org/martin/introduction.html

## Docker in dev

```bash
docker run \
  -p 3000:3000 \
  -v "$(pwd)/data-mbtiles":/data-mbtiles \
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

https://maplibre.org/martin/run-with-nginx.html#rewriting-urls
```nginx
location ~ /mbtiles/v2/(?<fwd_path>.*) {
    proxy_set_header  X-Rewrite-URL $uri;
    proxy_set_header  X-Forwarded-Host $host:$server_port;
    proxy_set_header  X-Forwarded-Proto $scheme;
    proxy_redirect    off;

    proxy_pass        http://127.0.0.1:3000/$fwd_path$is_args$args;
}
```

```bash
sudo systemctl restart nginx
```
