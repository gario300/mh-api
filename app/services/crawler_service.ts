import axios from 'axios'
import env from '#start/env'

export default class CrawlerService {
  static async searchGoogle(queries: string[]) {
    const results: string[] = []
    const apiKey = env.get('GOOGLE_API_KEY')
    const cx = env.get('GOOGLE_CX')

    if (!apiKey || !cx) {
      console.error('[Crawler] Error: Faltan credenciales GOOGLE_API_KEY o GOOGLE_CX en .env')
      return []
    }

    const blockedDomains = [
      'google.com',
      'youtube.com',
      'facebook.com',
      'twitter.com',
      'reddit.com',
      'instagram.com',
      'tiktok.com',
      'pinterest.com',
      'wikipedia.org',
      'yahoo.com',
      'bing.com',
    ]

    try {
      for (const query of queries) {
        console.log(`[Crawler] Consultando Google Custom Search API: "${query}"`)

        const { data } = await axios.get('https://www.googleapis.com/customsearch/v1', {
          params: {
            key: apiKey,
            cx: cx,
            q: query,
          },
        })

        if (data.items) {
          for (const item of data.items) {
            const href = item.link

            if (href && href.startsWith('http')) {
              try {
                const urlObj = new URL(href)
                const isBlocked = blockedDomains.some((domain) => urlObj.hostname.includes(domain))

                if (!isBlocked) {
                  results.push(urlObj.origin) // Guardamos solo el dominio raíz
                }
              } catch (e) {
                // URL inválida, la ignoramos
              }
            }
          }
        } else {
          console.log(`[Crawler] No se encontraron resultados (items) para: "${query}"`)
        }
      }
    } catch (error: any) {
      // Manejo seguro del error de la API de Google
      const errorMsg = error.response?.data?.error?.message || error.message
      console.error('[Crawler] Error al consultar Google API:', errorMsg)
    }

    return [...new Set(results)]
  }
}
