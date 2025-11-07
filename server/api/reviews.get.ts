import { defineEventHandler, getQuery } from 'h3'
import store from 'app-store-scraper'
import gplay from 'google-play-scraper'

export default defineEventHandler(async (event) => {
  const { id, appId, country = 'us', page = '1', store: storeType = 'apple' } = getQuery(event)

  if (!id && !appId) {
    return { error: 'Missing id or appId' }
  }

  try {
    const pageNum = Number(page || '1') || 1
    let reviews: any[] = []

    if (storeType === 'google') {
      // --- Google Play Logic ---
      // gplay.reviews không hỗ trợ phân trang (page), nó dùng nextPaginationToken
      // Để đơn giản, chúng ta sẽ lấy 50-100 reviews mới nhất và không phân trang
      const results = await gplay.reviews({
        appId: appId as string,
        country: (country as string) || 'us',
        lang: 'en',
        sort: gplay.sort.NEWEST,
        num: 50 // Lấy 50 reviews mới nhất
      })
      reviews = results.data || []

      // Chuẩn hóa GPlay reviews
      const normalized = reviews.map((r: any) => ({
        id: r.id,
        userName: r.userName,
        title: r.title, // GPlay reviews không có title
        text: r.text,
        score: r.score,
        version: r.version,
        date: r.date,
        url: r.url
      }))
      
      return {
        page: 1, // Luôn là trang 1
        count: normalized.length,
        reviews: normalized
      }

    } else {
      // --- Apple App Store Logic (Mặc định) ---
      reviews = await store.reviews({
        id: id ? Number(id) : undefined,
        appId: appId || undefined,
        country: (country as string) || 'us',
        page: pageNum,
        sort: store.sort.RECENT
      })

      // Chuẩn hóa App Store reviews
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
    }

  } catch (err) {
    console.error(err)
    return { error: 'Cannot fetch reviews' }
  }
})
