import 'dotenv/config'
import statsCard from './api/index.js'
import repoCard from './api/pin.js'
import langCard from './api/top-langs.js'
import wakatimeCard from './api/wakatime.js'
import gistCard from './api/gist.js'
import devPersonaCard from './api/dev-persona.js'
import customMetrics from './api/custom-metrics.js'
import express from 'express'

const app = express()
const router = express.Router()

router.get('/', statsCard)
router.get('/pin', repoCard)
router.get('/top-langs', langCard)
router.get('/wakatime', wakatimeCard)
router.get('/gist', gistCard)
router.get('/dev-persona', devPersonaCard)
router.get('/custom-metrics', customMetrics)

app.use('/api', router)

const port = process.env.PORT || process.env.port || 9000
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`)
})
