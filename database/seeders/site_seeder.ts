import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Site from '#models/site'

export default class extends BaseSeeder {
  async run() {
    // Limpiamos o actualizamos los existentes y añadimos nuevos
    const sites = [
      {
        name: 'Asura Comics',
        url: 'https://asuracomic.net',
        isActive: true,
      },
      {
        name: 'Reaper Scans',
        url: 'https://reaperscans.com',
        isActive: true,
      },
      {
        name: 'Flame Comics',
        url: 'https://flamecomics.com',
        isActive: true,
      },
      {
        name: 'MangaDex',
        url: 'https://mangadex.org',
        isActive: true,
      },
      {
        name: 'Void Scans',
        url: 'https://hivescans.com', // Void cambió a Hive
        isActive: true,
      },
      {
        name: 'Luminous Scans',
        url: 'https://luminousscans.com',
        isActive: true,
      },
      {
        name: 'Night Scans',
        url: 'https://nightscans.org',
        isActive: true,
      },
      {
        name: 'MangaReader',
        url: 'https://mangareader.to',
        isActive: true,
      },
      {
        name: 'Manhwa18',
        url: 'https://manhwa18.com',
        isActive: true,
      },
      {
        name: 'Leviatan Scans',
        url: 'https://en.leviatanscans.com',
        isActive: true,
      },
    ]

    for (const siteData of sites) {
      await Site.updateOrCreate({ url: siteData.url }, siteData)
    }
  }
}
