import Site from '#models/site'
import ScraperManager from '#services/scraper_manager'

export default class ScrapeSitesJob {
  static async run() {
    try {
      console.log('--- Iniciando Scraping Job ---')
      const sites = await Site.query().where('is_active', true)

      for (const site of sites) {
        try {
          console.log(`[Scraper] Obteniendo métricas para: ${site.name || site.url}`)
          await ScraperManager.scrape(site)
        } catch (e: any) {
          console.error(`[Scraper] Error en sitio ${site.id}:`, e.message)
        }
      }
      console.log('--- Finalizado Scraping Job ---')
    } catch (error) {
      console.error('[Scraper] Error crítico en el Job:', error)
    }
  }
}
