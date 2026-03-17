import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'site_metrics'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.float('score').after('uptime')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('score')
    })
  }
}
