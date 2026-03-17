import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Site from '#models/site'

export default class SiteMetric extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare siteId: number

  @column()
  declare dailyVisits: number

  @column()
  declare seoScore: number

  @column()
  declare speedScore: number

  @column()
  declare uptime: number

  @column()
  declare score: number

  @belongsTo(() => Site)
  declare site: BelongsTo<typeof Site>
}
