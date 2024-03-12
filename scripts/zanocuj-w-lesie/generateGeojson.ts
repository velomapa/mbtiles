import fs from 'fs'
import path from 'path'

const url =
  'https://mapserver.bdl.lasy.gov.pl/arcgis/services/WFS_BDL_mapa_turystyczna/MapServer/WFSServer?service=WFS&request=GetFeature&typename=WFS_BDL_mapa_turystyczna:Program_Zanocuj_w_lesie&outputFormat=GEOJSON'

async function fetchGeojson() {
  const resp = await fetch(url)
  return await resp.json()
}

const OUTPUT_PATH = path.resolve(__dirname, '../../data-geojson/zanocuj-w-lesie.geojson')

async function writeToFile(geojson: any) {
  return new Promise((resolve) => {
    fs.writeFile(OUTPUT_PATH, JSON.stringify(geojson), () => {
      resolve(null)
    })
  })
}

async function generateGeojson() {
  console.log('fetching geojson...')
  const geojson = await fetchGeojson()

  geojson.features.forEach((feature: any) => {
    feature.properties.class = 'zanocuj-w-lesie'
  })

  console.log('writing geojson...')
  await writeToFile(geojson)
  console.log(`Geojson saved to: ${OUTPUT_PATH}`)
}

generateGeojson()
