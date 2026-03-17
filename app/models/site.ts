import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import SiteMetric from '#models/site_metric'
import Ranking from '#models/ranking'

export default class Site extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare url: string

  @column()
  declare logo: string

  @column()
  declare isActive: boolean

  @hasMany(() => SiteMetric)
  declare metrics: HasMany<typeof SiteMetric>

  @hasMany(() => Ranking)
  declare rankings: HasMany<typeof Ranking>
}
