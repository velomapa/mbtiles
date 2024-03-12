import { spawn } from 'child_process'

const args = [
  '-o',
  'data-mbtiles/zanocuj-w-lesie.mbtiles',
  'data-geojson/zanocuj-w-lesie.geojson',
  '--force',
]
const child = spawn('tippecanoe', args)

child.on('error', console.error)

child.stdout.on('data', (data) => {
  process.stdout.write(data.toString())
})

child.stderr.on('data', (data) => {
  process.stderr.write(data.toString())
})
