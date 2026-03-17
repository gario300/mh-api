import scheduler from 'adonisjs-scheduler/services/main'
import DiscoverSitesJob from '#jobs/discover_sites_job'
import ScrapeSitesJob from '#jobs/scrape_sites_job'
import RankingJob from '#jobs/ranking_job'

// descubrir nuevos sitios cada 24h
scheduler
  .call(async () => {
    await DiscoverSitesJob.run()
  })
  .daily()

// scrapear datos cada 6h
scheduler
  .call(async () => {
    await ScrapeSitesJob.run()
  })
  .everySixHours()

// recalcular ranking
scheduler
  .call(async () => {
    await RankingJob.run()
  })
  .everySixHours()
