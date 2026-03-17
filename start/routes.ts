/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import DiscoverSitesJob from '#jobs/discover_sites_job'
import ScrapeSitesJob from '#jobs/scrape_sites_job'
import RankingJob from '#jobs/ranking_job'
const RankingsController = () => import('#controllers/rankings_controller')

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessToken, 'store'])
        router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('/profile', [controllers.Profile, 'show'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

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
