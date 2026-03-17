/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import DiscoverSitesJob from '#jobs/discover_sites_job'
import ScrapeSitesJob from '#jobs/scrape_sites_job'
import RankingJob from '#jobs/ranking_job'
const RankingsController = () => import('#controllers/rankings_controller')

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router.get('/rankings', [RankingsController, 'index'])

    router.get('/test-discover', async () => {
      await DiscoverSitesJob.run()
      return { status: 'discovery done' }
    })

    router.get('/test-scrape', async () => {
      await ScrapeSitesJob.run()
      return { status: 'scraping done' }
    })

    router.get('/test-ranking', async () => {
      await RankingJob.run()
      return { status: 'ranking updated' }
    })
  })
  .prefix('/api/v1')
