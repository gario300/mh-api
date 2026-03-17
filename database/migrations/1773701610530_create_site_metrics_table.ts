import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'site_metrics'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('site_id').unsigned().references('id').inTable('sites')
      table.integer('daily_visits')
      table.float('seo_score')
      table.float('speed_score')
      table.float('uptime')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
