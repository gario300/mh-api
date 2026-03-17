import SiteMetric from '#models/site_metric'
import Site from '#models/site'

export default class ReaperScraper {
  static async scrapePopular(site: Site) {
    // Aquí iría la lógica de scraping real para obtener estos valores
    const estimatedVisits = Math.floor(Math.random() * 5000)
    const seo = Math.floor(Math.random() * 100)
    const speed = Math.floor(Math.random() * 100)
    const uptime = 98.5

    await SiteMetric.create({
      siteId: site.id,
      dailyVisits: estimatedVisits,
      seoScore: seo,
      speedScore: speed,
      uptime: uptime,
    })

    return []
  }
}
