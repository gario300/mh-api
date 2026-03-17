import RankingService from '#services/ranking_service'

export default class RankingJob {
  static async run() {
    try {
      console.log('--- Iniciando Ranking Job ---')
      await RankingService.calculate()
      console.log('--- Finalizado Ranking Job ---')
    } catch (error) {
      console.error('[Ranking] Error crítico en el Job:', error)
    }
  }
}
