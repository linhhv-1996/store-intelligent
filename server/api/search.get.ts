import { defineEventHandler, getQuery } from 'h3'
import store from 'app-store-scraper'

export default defineEventHandler(async (event) => {
  const { term, country = 'us', limit = '12' } = getQuery(event)

  if (!term) {
    return { error: 'Missing term' }
  }

  try {
    const apps: any[] = await store.search({
      term: term as string,
      country: (country as string) || 'us',
      num: Number(limit)
    })

    const trimmed = apps.map((a: any) => ({
      title: a.title,
      appId: a.appId,
      icon: a.icon,
      url: a.url,
      developer: a.developer,
      rating: a.score ?? a.scoreCurrentVersion ?? null,
      price: a.price,
      free: a.free
    }))

    return trimmed
  } catch (err) {
    console.error(err)
    return { error: 'Cannot search apps' }
  }
})
