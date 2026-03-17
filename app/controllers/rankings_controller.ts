import Ranking from '#models/ranking'

export default class RankingsController {
  async index() {
    const rankings = await Ranking.query().preload('site').orderBy('rank_position', 'asc')

    return rankings
  }
}
