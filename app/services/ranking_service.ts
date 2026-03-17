import SiteMetric from '#models/site_metric'
import Ranking from '#models/ranking'

export default class RankingService {
  static async calculate() {
    const metrics = await SiteMetric.query()

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
