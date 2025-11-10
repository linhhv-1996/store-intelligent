import { defineEventHandler, getQuery } from 'h3'

import store from '@libs/app-store-scraper'
import gplay from '@libs/google-play-scraper'


export default defineEventHandler(async (event) => {
  const { id, appId, country = 'us', page = '1', token, store: storeType = 'apple' } = getQuery(event)

  if (!id && !appId) {
    return { error: 'Missing id or appId' }
  }

  try {
    let reviews: any[] = []

    if (storeType === 'google') {
      // --- Google Play Logic (ĐÃ CẬP NHẬT) ---

      // [FIX] Tạo options động
      const gplayOptions: gplay.IReviewsOptions = {
        appId: appId as string,
        country: (country as string) || 'us',
        lang: 'en',
        sort: gplay.sort.NEWEST,
      }

      if (token) {
        // Nếu có token (trang 2+), CHỈ dùng token
        gplayOptions.token = token as string
      } 
      else {
        // Nếu không có token (trang 1), DÙNG num
        gplayOptions.num = 50
      }

      // [FIX] Gọi API với options đã chuẩn hóa
      const results = await gplay.reviews(gplayOptions)
      reviews = results.data || []

      // Chuẩn hóa GPlay reviews
      const normalized = reviews.map((r: any) => ({
        id: r.id,
        userName: r.userName,
        title: r.title,
        text: r.text,
        score: r.score,
        version: r.version,
        date: r.replyDate,
        url: r.url
      }))

      return {
        page: 1, // Google không dùng page
        count: normalized.length,
        reviews: normalized,
        nextPageToken: results.nextPaginationToken || null // Vẫn trả về token
      }

    } else {
      // --- Apple App Store Logic (Mặc định) ---
      const pageNum = Number(page || '1') || 1
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
        date: r.updated,
        url: r.url
      }))
      
      return {
        page: pageNum,
        count: normalized.length,
        reviews: normalized,
        nextPageToken: null // Apple không dùng token
      }
    }

  } catch (err) {
    console.error(err)
    return { error: 'Cannot fetch reviews' }
  }
})
