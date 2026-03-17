import { Ignitor } from '@adonisjs/core/ignitor'
import app from '@adonisjs/core/services/app'

const ignitor = new Ignitor(new URL('./', import.meta.url), {
  hash: 'test',
})

const application = ignitor.createApp('console')
await application.init()
await application.boot()

const { default: ScrapeSitesJob } = await import('#jobs/scrape_sites_job')
const { default: RankingJob } = await import('#jobs/ranking_job')

console.log('Ejecutando Scraping...')
await ScrapeSitesJob.run()
console.log('Ejecutando Ranking...')
await RankingJob.run()

await application.terminate()
