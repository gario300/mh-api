import SiteMetric from '#models/site_metric'

export default class PopularityService {
  static calculate(metric: SiteMetric) {
    const visitsWeight = 0.5
    const seoWeight = 0.2
    const speedWeight = 0.2
    const uptimeWeight = 0.1

    return (
      (metric.dailyVisits || 0) * visitsWeight +
      (metric.seoScore || 0) * seoWeight +
      (metric.speedScore || 0) * speedWeight +
      (metric.uptime || 0) * uptimeWeight
    )
  }

  async getStats(domain: string) {
    // Logic for getting popularity stats
    return domain
  }
}
