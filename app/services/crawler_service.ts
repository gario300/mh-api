import axios from 'axios'
import * as cheerio from 'cheerio'

export default class CrawlerService {
  static async searchGoogle(queries: string[]) {
    const results: string[] = []

    for (const query of queries) {
      const { data } = await axios.get(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`
      )

      const $ = cheerio.load(data)

      $('a').each((_, el) => {
        const href = $(el).attr('href')

        if (href?.includes('http')) {
          const clean = href.split('&')[0].replace('/url?q=', '')
          results.push(clean)
        }
      })
    }

    return [...new Set(results)]
  }
}
