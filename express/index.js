import { readFileSync } from 'fs'
import glob from 'glob'
import express from 'express'

const vercelConfig = JSON.parse(readFileSync('./vercel.json', 'utf8'))
const vercelFunctions = Object.keys(vercelConfig.functions)

const port = process.env.PORT || 3000
const app = express()

const files = vercelFunctions.map(gl => glob.sync(gl)).flat()
await loadApiRoutes(files)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

async function loadApiRoutes(files) {
  for (const file of files) {
    const route = `/${file.replace('.js', '').replace('index', '')}`
    console.log(`Loading route '${route}' with handler from '${file}'`)
    const handler = await import(`../${file}`)
    app.get(route, handler.default)
  }
}
