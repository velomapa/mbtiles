# Repository with different mbtiles stuff

- Server - https://maplibre.org/martin/introduction.html

## Docker in dev

```bash
docker run \
  --rm \
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

PBF files are cached for 1h

```nginx
location ~ /mbtiles/v2/(?<fwd_path>.*) {
    proxy_set_header  X-Rewrite-URL $uri;
    proxy_set_header  X-Forwarded-Host $host:$server_port;
    proxy_set_header  X-Forwarded-Proto $scheme;
    proxy_redirect    off;

    proxy_pass        http://127.0.0.1:3000/$fwd_path$is_args$args;
}

location ~ /mbtiles/v2/(?<fwd_path>.pbf) {
    proxy_set_header  X-Rewrite-URL $uri;
    proxy_set_header  X-Forwarded-Host $host:$server_port;
    proxy_set_header  X-Forwarded-Proto $scheme;
    proxy_redirect    off;
    add_header Cache-Control "public, max-age=3600";

    proxy_pass        http://127.0.0.1:3000/$fwd_path$is_args$args;
}
```

```bash
sudo systemctl restart nginx
```

## Data

- **Poland booking.com hotels**

  - data exported from booking.com
  - converted to mbtiles using tippecanoe

- **Zanocuj w lesie**

  - [velomapa.pl/mapy/zanocuj-w-lesie](https://velomapa.pl/mapy/zanocuj-w-lesie)
  - data downloaded from WFS service
    - https://mapserver.bdl.lasy.gov.pl/arcgis/services/WFS_BDL_mapa_turystyczna/MapServer/WFSServer?service=WFS&request=GetFeature&typename=WFS_BDL_mapa_turystyczna:Program_Zanocuj_w_lesie&outputFormat=GEOJSON
  - converted to mbtiles using tippecanoe

- **Poland parks**
  - [velomapa.pl/mapy/parki](https://velomapa.pl/mapy/parki)
  - data extracted from osm
  - converted to geojson with travelermap.net scripts
  - converted to mbtiles using tippecanoe

## Tippecanoe

https://github.com/felt/tippecanoe

```bash
tippecanoe -o data-mbtiles/zanocuj-w-lesie.mbtiles data-geojson/zanocuj-w-lesie.geojson --force
```

### poland_bookingcom_hotels

https://github.com/felt/tippecanoe?tab=readme-ov-file#clustered-points-world-cities-summing-the-clustered-population-visible-at-all-zoom-levels](https://github.com/felt/tippecanoe?tab=readme-ov-file#clustered-points-world-cities-summing-the-clustered-population-visible-at-all-zoom-levels)

```bash
tippecanoe -z14 -o data-mbtiles/poland_bookingcom_hotels.mbtiles -r1 --cluster-distance=30 --cluster-maxzoom=13 data-geojson/poland_bookingcom_hotels.geojson --force
```
