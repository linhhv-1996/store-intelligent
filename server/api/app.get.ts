import { defineEventHandler, getQuery } from 'h3'
import store from 'app-store-scraper'

export default defineEventHandler(async (event) => {
  const { id, appId, country = 'us' } = getQuery(event)

  if (!id && !appId) {
    return { error: 'Missing id or appId' }
  }

  try {
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
  } catch (err) {
    console.error(err)
    return { error: 'Cannot fetch app info' }
  }
})
