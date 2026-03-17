import Site from '#models/site'
import ScraperManager from '#services/scraper_manager'

export default class ScrapeSitesJob {
  static async run() {
    const sites = await Site.query().where('is_active', true)

    for (const site of sites) {
      await ScraperManager.scrape(site)
    }
  }
}
