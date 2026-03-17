import Site from '#models/site'
import SiteMetric from '#models/site_metric'
import TrafficService from './traffic_service.js'

export default class ScraperManager {
  /**
   * Procesa un sitio para obtener sus métricas de tráfico y rendimiento.
   */
  static async scrape(site: Site) {
    console.log(`[Scraper] Iniciando recolección de datos para: ${site.name || site.url}`)

    try {
      // 1. Obtenemos visitas estimadas reales
      const visits = await TrafficService.getEstimatedVisits(site.url)

      // 2. Simulamos SEO y Velocidad (en el futuro usaremos PageSpeed API)
      const seo = Math.floor(Math.random() * (95 - 70 + 1)) + 70
      const speed = Math.floor(Math.random() * (90 - 40 + 1)) + 40
      const uptime = 99.9

      // 3. Guardamos la métrica en la base de datos
      await SiteMetric.create({
        siteId: site.id,
        dailyVisits: visits,
        seoScore: seo,
        speedScore: speed,
        uptime: uptime,
      })

      console.log(`[Scraper] Éxito: ${visits} visitas estimadas para ${site.url}`)
    } catch (error) {
      console.error(`[Scraper] Error procesando ${site.url}:`, error.message)
    }
  }
}
