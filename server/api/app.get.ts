import { defineEventHandler, getQuery } from 'h3'
import store from 'app-store-scraper'
import gplay from 'google-play-scraper'

// [ĐÃ CẬP NHẬT] Hàm helper để chuẩn hóa kết quả từ Google Play
const normalizeGPlayApp = (appInfo: any): any => {
  const rating = appInfo.score ?? null
  const ratingCount = appInfo.ratings ?? 0 // 'ratings' là tổng số lượt đánh giá
  
  let updatedDate = appInfo.updated
  if (updatedDate && !isNaN(Number(updatedDate))) {
     try {
        // Chuyển đổi timestamp (miliseconds) sang ngày YYYY-MM-DD
        updatedDate = new Date(Number(updatedDate)).toISOString().split('T')[0]
     } catch (e) { 
        updatedDate = appInfo.updated // Giữ nguyên nếu lỗi
     }
  }

  return {
    title: appInfo.title,
    id: appInfo.appId, // Google Play dùng appId làm id
    appId: appInfo.appId,
    url: appInfo.url,
    icon: appInfo.icon,
    description: appInfo.description,
    developer: appInfo.developer,
    developerId: appInfo.developerId,
    developerUrl: appInfo.developerWebsite, // Sửa từ developerUrl
    price: appInfo.price,
    free: appInfo.free,
    currency: appInfo.currency,
    rating,
    ratingCount,
    genre: appInfo.genre,
    genres: appInfo.categories ? appInfo.categories.map((c: any) => c.name) : [], // Map từ categories
    version: appInfo.version,
    released: appInfo.released,
    updated: updatedDate, // Đã format
    releaseNotes: appInfo.recentChanges, // Sửa từ releaseNotes
    size: appInfo.size, // Vẫn giữ size gốc (nếu có)
    installs: appInfo.maxInstalls, // [THÊM MỚI] Dùng maxInstalls
    requiredOsVersion: appInfo.androidVersionText, // Dùng androidVersionText
    contentRating: appInfo.contentRating,
    languages: [], // gplay API này không trả về ngôn ngữ
    supportedDevices: [],
    screenshots: appInfo.screenshots,
    ipadScreenshots: [],
    appletvScreenshots: [],
    downloadsAvailable: false
  }
}

export default defineEventHandler(async (event) => {
  const { id, appId, country = 'us', store: storeType = 'apple' } = getQuery(event)

  if (!id && !appId) {
    return { error: 'Missing id or appId' }
  }

  try {
    if (storeType === 'google') {
      // --- Google Play Logic ---
      if (!appId) return { error: 'Missing appId for Google Play' }
      
      const appInfo: any = await gplay.app({
        appId: appId as string,
        country: (country as string) || 'us',
        lang: 'en' // gplay cần lang
      })
      
      return normalizeGPlayApp(appInfo) // Dùng hàm chuẩn hóa mới

    } else {
      // --- Apple App Store Logic (Mặc định) ---
      const appInfo: any = await store.app({
        id: id ? Number(id) : undefined,
        appId: appId || undefined,
        country: (country as string) || 'us'
      })

      const rating =
        appInfo.score ??
        appInfo.scoreCurrentVersion ??
        null

      const ratingCount =
        appInfo.ratings ??
        appInfo.reviews ??
        appInfo.userRatingCount ??
        0

      const basic = {
        title: appInfo.title,
        id: appInfo.id,
        appId: appInfo.appId,
        url: appInfo.url,
        icon: appInfo.icon,
        description: appInfo.description,
        developer: appInfo.developer,
        developerId: appInfo.developerId,
        developerUrl: appInfo.developerUrl,
        price: appInfo.price,
        free: appInfo.free,
        currency: appInfo.currency,
        rating,
        ratingCount,
        genre: appInfo.genre || appInfo.primaryGenre,
        genres: appInfo.genres,
        version: appInfo.version,
        released: appInfo.released,
        updated: appInfo.updated || appInfo.currentVersionReleaseDate,
        currentVersionReleaseDate: appInfo.currentVersionReleaseDate,
        releaseNotes: appInfo.releaseNotes,
        size: appInfo.size || appInfo.fileSizeBytes,
        installs: null, // Apple không có
        requiredOsVersion: appInfo.requiredOsVersion,
        contentRating: appInfo.contentRating,
        languages: appInfo.languages,
        supportedDevices: appInfo.supportedDevices,
        screenshots: appInfo.screenshots,
        ipadScreenshots: appInfo.ipadScreenshots,
        appletvScreenshots: appInfo.appletvScreenshots,
        downloadsAvailable: false
      }
      return basic
    }

  } catch (err) {
    console.error(err)
    return { error: 'Cannot fetch app info' }
  }
})
