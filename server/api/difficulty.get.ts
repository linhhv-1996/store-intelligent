import { defineEventHandler, getQuery } from 'h3'
import store from 'app-store-scraper'
import gplay from 'google-play-scraper'

// --- Helper Functions (Lấy từ app.get.ts nhưng tối giản) ---

// Chỉ lấy các trường cần để tính điểm
const normalizeGPlayApp = (appInfo: any): any => {
  const ratingCount = appInfo.ratings ?? 0
  const installs = appInfo.maxInstalls ?? 0
  return {
    ratingCount,
    installs,
  }
}

const normalizeAppleApp = (appInfo: any): any => {
  const ratingCount =
    appInfo.ratings ?? appInfo.reviews ?? appInfo.userRatingCount ?? 0
  return {
    ratingCount,
    installs: null,
  }
}

// --- Hàm tính điểm (Bạn có thể tinh chỉnh công thức này) ---
const calculateDifficulty = (apps: any[], storeType: string): number => {
  if (!apps.length) return 0

  let totalScore = 0

  if (storeType === 'google') {
    // Với Google: Lượt tải (installs) quan trọng
    const avgInstalls =
      apps.reduce((acc, app) => acc + (app.installs || 0), 0) / apps.length
    // Chuyển đổi sang thang 0-100 (log10)
    // 10M installs ~ 100 điểm, 1M ~ 85, 100k ~ 71
    totalScore = Math.log10(avgInstalls + 1) * 14.28
  } else {
    // Với Apple: Lượt review (ratingCount) là chính
    const avgRatings =
      apps.reduce((acc, app) => acc + (app.ratingCount || 0), 0) / apps.length
    // Chuyển đổi sang thang 0-100 (log10)
    // 1M ratings ~ 100 điểm, 100k ~ 83, 10k ~ 66
    totalScore = Math.log10(avgRatings + 1) * 16.67
  }

  return Math.min(Math.max(Math.round(totalScore), 0), 100)
}

// --- API Handler ---

export default defineEventHandler(async (event) => {
  const { term, country = 'us', store: storeType = 'apple' } = getQuery(event)

  if (!term) {
    return { error: 'Missing term' }
  }

  // Số lượng app để lấy về phân tích ban đầu
  const NUM_TO_ANALYZE = 20

  try {
    let searchResults: any[] = []

    // --- BƯỚC 1: Search Top 20 (Giống search.get.ts) ---
    if (storeType === 'google') {
      searchResults = await gplay.search({
        term: term as string,
        country: (country as string) || 'us',
        num: NUM_TO_ANALYZE,
        lang: 'en',
      })
    } else {
      searchResults = await store.search({
        term: term as string,
        country: (country as string) || 'us',
        num: NUM_TO_ANALYZE,
      })
    }

    if (!searchResults.length) {
      return { difficulty: 0, appsAnalyzed: 0 }
    }

    // --- BƯỚC 2: Lọc (FIX LỖ HỔNG) ---
    // Chỉ giữ lại app có title/appId chứa từ khóa, để loại bỏ kết quả "fuzzy match" vớ vẩn
    const normalizedTerm = (term as string).toLowerCase().replace(/-/g, ' ').trim()
    
    const relevantApps = searchResults.filter(app => {
      const title = (app.title || '').toLowerCase()
      // gplay search trả về appId, store search trả về appId
      const appId = (app.appId || '').toLowerCase()
      
      // Nếu từ khóa có 1 từ, yêu cầu khớp chính xác (word boundary)
      if (!normalizedTerm.includes(' ')) {
        const regex = new RegExp(`\\b${normalizedTerm}\\b`, 'i')
         return regex.test(title) || regex.test(appId)
      }
      
      // Nếu từ khóa nhiều từ, chỉ cần 'includes'
      return title.includes(normalizedTerm) || appId.includes(normalizedTerm)
    })

    // Nếu search "asdfghjkl", mảng này sẽ rỗng
    if (!relevantApps.length) {
      return { difficulty: 0, appsAnalyzed: 0 }
    }

    // --- BƯỚC 3: Gọi Detail (Giống app.get.ts) ---
    // Chỉ gọi detail cho các app *thực sự* liên quan
    const appDetailPromises = relevantApps.map(async (app) => {
      try {
        if (storeType === 'google') {
          const appInfo: any = await gplay.app({
            appId: app.appId as string, // app.appId đã có từ Bước 1
            country: (country as string) || 'us',
            lang: 'en',
          })
          return normalizeGPlayApp(appInfo)
        } else {
          const appInfo: any = await store.app({
            id: Number(app.id), // store.search trả về 'id'
            country: (country as string) || 'us',
          })
          return normalizeAppleApp(appInfo)
        }
      } catch (e) {
        return null // Bỏ qua nếu 1 app lỗi
      }
    })

    const detailedApps = (await Promise.all(appDetailPromises)).filter(Boolean)

    // --- BƯỚC 4: Tính điểm ---
    const difficultyScore = calculateDifficulty(detailedApps, storeType as string)

    return {
      difficulty: difficultyScore,
      appsAnalyzed: detailedApps.length, // Trả về số app đã dùng để tính
    }
  } catch (err: any) {
    console.error(err)
    return { error: err.message || 'Cannot calculate difficulty' }
  }
})
