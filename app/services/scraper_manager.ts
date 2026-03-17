import Site from '#models/site'
import AsuraScraper from './scrapers/asura_scraper.js'
import ReaperScraper from './scrapers/reaper_scraper.js'

export default class ScraperManager {
  static async scrape(site: Site) {
    if (site.url.includes('asura')) {
      return AsuraScraper.scrapeLatest(site)
    }

    if (site.url.includes('reaper')) {
      return ReaperScraper.scrapePopular(site)
    }

    // fallback genérico
    return this.genericScraper(site.url)
  }

  static async genericScraper(url: string) {
    return [url]
  }
}
