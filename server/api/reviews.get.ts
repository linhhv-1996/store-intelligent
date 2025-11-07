import { defineEventHandler, getQuery } from 'h3'
import store from 'app-store-scraper'

export default defineEventHandler(async (event) => {
  const { id, appId, country = 'us', page = '1' } = getQuery(event)

  if (!id && !appId) {
    return { error: 'Missing id or appId' }
  }

  try {
    const pageNum = Number(page || '1') || 1

    const reviews: any[] = await store.reviews({
      id: id ? Number(id) : undefined,
      appId: appId || undefined,
      country: (country as string) || 'us',
      page: pageNum,
      sort: store.sort.RECENT
    })

    const normalized = reviews.map((r: any) => ({
      id: r.id,
      userName: r.userName,
      title: r.title,
      text: r.text,
      score: r.score,
      version: r.version,
      date: r.date,
      url: r.url
    }))

    return {
      page: pageNum,
      count: normalized.length,
      reviews: normalized
    }
  } catch (err) {
    console.error(err)
    return { error: 'Cannot fetch reviews' }
  }
})
