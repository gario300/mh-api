import CrawlerService from '#services/crawler_service'
import Site from '#models/site'

export default class DiscoverSitesJob {
  static async run() {
    try {
      console.log('--- Iniciando Discovery Job ---')
      const urls = await CrawlerService.searchGoogle(['read manhwa online', 'manhwa sites list'])

      for (const url of urls) {
        try {
          const urlObj = new URL(url)
          const name = urlObj.hostname.replace('www.', '')

          await Site.firstOrCreate({ url }, { name: name, isActive: true })
          console.log(`[Discovery] Guardado sitio activo: ${name} (${url})`)
        } catch (e: any) {
          console.error(`[Discovery] Error al procesar la URL ${url}:`, e.message)
        }
      }
      console.log('--- Finalizado Discovery Job ---')
    } catch (error) {
      console.error('[Discovery] Error crítico en el Job:', error)
    }
  }
}
