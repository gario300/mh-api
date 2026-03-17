import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Site from '#models/site'

export default class extends BaseSeeder {
  async run() {
    await Site.createMany([
      {
        name: 'AsuraScans',
        url: 'https://asurascans.com',
        isActive: true,
      },
      {
        name: 'ReaperScans',
        url: 'https://reaperscans.com',
        isActive: true,
      },
    ])
  }
}
