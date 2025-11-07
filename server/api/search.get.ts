import { defineEventHandler, getQuery } from 'h3'
import store from 'app-store-scraper'
import gplay from 'google-play-scraper'


const getIdFromUrl = ((url: any) => {
  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    return params.get('id');
  } catch (error) {
    return 'com.example.app';
  }
})

export default defineEventHandler(async (event) => {
  const { term, country = 'us', store: storeType = 'apple' } = getQuery(event)
  if (!term) {
    return { error: 'Missing term' }
  }

  try {
    let apps: any[] = []
    const numLimit = 99

    if (storeType === 'google') {
      // --- Google Play Logic ---
      apps = await gplay.search({
        term: term as string,
        country: (country as string) || 'us',
        num: numLimit,
        lang: 'en'
      })
      
      // Chuẩn hóa kết quả GPlay
      const trimmed = apps.map((a: any) => ({
        title: a.title,
        // appId: a.appId,
        appId: getIdFromUrl(a.url),
        icon: a.icon,
        url: a.url,
        developer: a.developer,
        rating: a.score ?? null,
        price: a.price,
        free: a.price ? false : true,
      }))

      return trimmed

    } else {
      // --- Apple App Store Logic (Mặc định) ---
      apps = await store.search({
        term: term as string,
        country: (country as string) || 'us',
        num: numLimit,
      })
      
      // Chuẩn hóa kết quả App Store
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
    }
    
  } catch (err) {
    console.error(err)
    return { error: 'Cannot search apps' }
  }
})
