import RankingService from '#services/ranking_service'

export default class RankingJob {
  static async run() {
    await RankingService.calculate()
  }
}
