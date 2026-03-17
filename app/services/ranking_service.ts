import SiteMetric from '#models/site_metric'
import Ranking from '#models/ranking'

export default class RankingService {
  static async calculate() {
    // Obtenemos solo la métrica más reciente para cada sitio
    const subquery = SiteMetric.query().max('id').groupBy('site_id')
    const metrics = await SiteMetric.query().whereIn('id', subquery)

    for (const metric of metrics) {
      const score =
        (metric.dailyVisits || 0) * 0.5 +
        (metric.seoScore || 0) * 0.2 +
        (metric.speedScore || 0) * 0.2 +
        (metric.uptime || 0) * 0.1

      await Ranking.updateOrCreate(
        { siteId: metric.siteId! },
        {
          score: score,
        }
      )
    }

    const rankings = await Ranking.query().orderBy('score', 'desc')

    let position = 1

    for (const rank of rankings) {
      rank.rankPosition = position++
      await rank.save()
    }
  }
}
