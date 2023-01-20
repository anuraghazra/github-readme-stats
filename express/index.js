import { readdirSync } from 'fs'
import express from 'express'

const port = process.env.PORT || 3000
const app = express()

await loadApiRoutes()

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

async function loadApiRoutes() {
  const files = readdirSync('api')
  for (const file of files) {
    const route = `/api/${file.replace('.js', '').replace('index', '')}`
    console.log(`Loading route '${route}' with handler from ${file}`)
    const handler = await import(`../api/${file}`)
    app.get(route, handler.default)
  }
}
