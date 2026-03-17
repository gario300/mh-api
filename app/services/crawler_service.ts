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
            this.processUrl(href, results, blockedDomains)
          }
        }
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.error?.message || error.message
      console.error(`[Crawler] Google API error: ${errorMsg}. Probando fallback DuckDuckGo...`)

      for (const query of queries) {
        const fallbackUrls = await this.searchDuckDuckGo(query)
        for (const url of fallbackUrls) {
          this.processUrl(url, results, blockedDomains)
        }
      }
    }

    return [...new Set(results)]
  }

  private static processUrl(href: string, results: string[], blockedDomains: string[]) {
    if (href && href.startsWith('http')) {
      try {
        const urlObj = new URL(href)
        const isBlocked = blockedDomains.some((domain) => urlObj.hostname.includes(domain))
        if (!isBlocked) {
          results.push(urlObj.origin)
        }
      } catch (e) {}
    }
  }

  private static async searchDuckDuckGo(query: string): Promise<string[]> {
    try {
      const { data } = await axios.get(
        `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept':
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referer': 'https://duckduckgo.com/',
          },
        }
      )

      const urls: string[] = []
      const regex = /<a class="result__a" href="([^"]+)"/g
      let match
      while ((match = regex.exec(data)) !== null) {
        let url = match[1]
        if (url.includes('uddg=')) {
          url = decodeURIComponent(url.split('uddg=')[1].split('&')[0])
        }
        urls.push(url)
      }

      if (urls.length === 0) {
        return await this.searchBing(query)
      }

      console.log(`[Crawler] DuckDuckGo encontró ${urls.length} enlaces.`)
      return urls
    } catch (e: any) {
      return await this.searchBing(query)
    }
  }

  private static async searchBing(query: string): Promise<string[]> {
    try {
      console.log(`[Crawler] Probando fallback Bing para: "${query}"`)
      const { data } = await axios.get(
        `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
          },
        }
      )

      const urls: string[] = []
      const regex = /<li class="b_algo">.*?<h2><a href="([^"]+)"/g
      let match
      while ((match = regex.exec(data)) !== null) {
        urls.push(match[1])
      }

      console.log(`[Crawler] Bing encontró ${urls.length} enlaces.`)
      return urls
    } catch (e: any) {
      console.error('[Crawler] Todos los buscadores de fallback fallaron.')
      return []
    }
  }
}
