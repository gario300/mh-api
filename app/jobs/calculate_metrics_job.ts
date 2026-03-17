import SiteMetric from '#models/site_metric'
import PopularityService from '#services/popularity_service'

export default class CalculateMetricsJob {
  static async run() {
    const metrics = await SiteMetric.query()

    for (const metric of metrics) {
      const score = PopularityService.calculate(metric)

      metric.score = score
      await metric.save()
    }
  }
}
