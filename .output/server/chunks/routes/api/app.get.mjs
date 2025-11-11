import { d as defineEventHandler, g as getQuery } from '../../nitro/nitro.mjs';
import { g as gplay, s as store } from '../../_/index.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'hpagent';
import 'node:url';
import 'ramda';
import 'memoizee';
import 'request';
import 'throttled-request';
import 'cheerio';
import 'xml2js';
import 'querystring';
import 'got';
import 'url';

const normalizeGPlayApp = (appInfo) => {
  var _a, _b;
  const rating = (_a = appInfo.score) != null ? _a : null;
  const ratingCount = (_b = appInfo.ratings) != null ? _b : 0;
  let updatedDate = appInfo.updated;
  if (updatedDate && !isNaN(Number(updatedDate))) {
    try {
      updatedDate = new Date(Number(updatedDate)).toISOString().split("T")[0];
    } catch (e) {
      updatedDate = appInfo.updated;
    }
  }
  return {
    title: appInfo.title,
    id: appInfo.appId,
    // Google Play dùng appId làm id
    appId: appInfo.appId,
    url: appInfo.url,
    icon: appInfo.icon,
    description: appInfo.description,
    developer: appInfo.developer,
    developerId: appInfo.developerId,
    developerUrl: appInfo.developerWebsite,
    // Sửa từ developerUrl
    price: appInfo.price,
    free: appInfo.free,
    currency: appInfo.currency,
    rating,
    ratingCount,
    genre: appInfo.genre,
    genres: appInfo.categories ? appInfo.categories.map((c) => c.name) : [],
    // Map từ categories
    version: appInfo.version,
    released: appInfo.released,
    updated: updatedDate,
    // Đã format
    releaseNotes: appInfo.recentChanges,
    // Sửa từ releaseNotes
    size: appInfo.size,
    // Vẫn giữ size gốc (nếu có)
    installs: appInfo.maxInstalls,
    // [THÊM MỚI] Dùng maxInstalls
    requiredOsVersion: appInfo.androidVersionText,
    // Dùng androidVersionText
    contentRating: appInfo.contentRating,
    languages: [],
    // gplay API này không trả về ngôn ngữ
    supportedDevices: [],
    screenshots: appInfo.screenshots,
    ipadScreenshots: [],
    appletvScreenshots: [],
    downloadsAvailable: false
  };
};
const app_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e;
  const { id, appId, country = "us", store: storeType = "apple" } = getQuery(event);
  if (!id && !appId) {
    return { error: "Missing id or appId" };
  }
  try {
    if (storeType === "google") {
      if (!appId) return { error: "Missing appId for Google Play" };
      const appInfo = await gplay.app({
        appId,
        country: country || "us",
        lang: "en"
        // gplay cần lang
      });
      return normalizeGPlayApp(appInfo);
    } else {
      const appInfo = await store.app({
        id: id ? Number(id) : void 0,
        appId: appId || void 0,
        country: country || "us"
      });
      const rating = (_b = (_a = appInfo.score) != null ? _a : appInfo.scoreCurrentVersion) != null ? _b : null;
      const ratingCount = (_e = (_d = (_c = appInfo.ratings) != null ? _c : appInfo.reviews) != null ? _d : appInfo.userRatingCount) != null ? _e : 0;
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
        installs: null,
        // Apple không có
        requiredOsVersion: appInfo.requiredOsVersion,
        contentRating: appInfo.contentRating,
        languages: appInfo.languages,
        supportedDevices: appInfo.supportedDevices,
        screenshots: appInfo.screenshots,
        ipadScreenshots: appInfo.ipadScreenshots,
        appletvScreenshots: appInfo.appletvScreenshots,
        downloadsAvailable: false
      };
      return basic;
    }
  } catch (err) {
    console.error(err);
    return { error: "Cannot fetch app info" };
  }
});

export { app_get as default };
//# sourceMappingURL=app.get.mjs.map
