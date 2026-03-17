import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Site from '#models/site'

export default class Ranking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare siteId: number

  @column()
  declare score: number

  @column()
  declare rankPosition: number

  @belongsTo(() => Site)
  declare site: BelongsTo<typeof Site>
}
