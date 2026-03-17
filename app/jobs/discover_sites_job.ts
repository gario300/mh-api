import CrawlerService from '#services/crawler_service'
import Site from '#models/site'

export default class DiscoverSitesJob {
  static async run() {
    const urls = await CrawlerService.searchGoogle(['read manhwa online', 'manhwa sites list'])

    for (const url of urls) {
      await Site.firstOrCreate({ url })
    }
  }
}
