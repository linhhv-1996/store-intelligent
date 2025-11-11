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
  const ratingCount = (_a = appInfo.ratings) != null ? _a : 0;
  const installs = (_b = appInfo.maxInstalls) != null ? _b : 0;
  return {
    ratingCount,
    installs
  };
};
const normalizeAppleApp = (appInfo) => {
  var _a, _b, _c;
  const ratingCount = (_c = (_b = (_a = appInfo.ratings) != null ? _a : appInfo.reviews) != null ? _b : appInfo.userRatingCount) != null ? _c : 0;
  return {
    ratingCount,
    installs: null
  };
};
const calculateDifficulty = (apps, storeType) => {
  if (!apps.length) return 0;
  let totalScore = 0;
  if (storeType === "google") {
    const avgInstalls = apps.reduce((acc, app) => acc + (app.installs || 0), 0) / apps.length;
    totalScore = Math.log10(avgInstalls + 1) * 14.28;
  } else {
    const avgRatings = apps.reduce((acc, app) => acc + (app.ratingCount || 0), 0) / apps.length;
    totalScore = Math.log10(avgRatings + 1) * 16.67;
  }
  return Math.min(Math.max(Math.round(totalScore), 0), 100);
};
const difficulty_get = defineEventHandler(async (event) => {
  const { term, country = "us", store: storeType = "apple" } = getQuery(event);
  if (!term) {
    return { error: "Missing term" };
  }
  const NUM_TO_ANALYZE = 20;
  try {
    let searchResults = [];
    if (storeType === "google") {
      searchResults = await gplay.search({
        term,
        country: country || "us",
        num: NUM_TO_ANALYZE,
        lang: "en"
      });
    } else {
      searchResults = await store.search({
        term,
        country: country || "us",
        num: NUM_TO_ANALYZE
      });
    }
    if (!searchResults.length) {
      return { difficulty: 0, appsAnalyzed: 0 };
    }
    const normalizedTerm = term.toLowerCase().replace(/-/g, " ").trim();
    const relevantApps = searchResults.filter((app) => {
      const title = (app.title || "").toLowerCase();
      const appId = (app.appId || "").toLowerCase();
      if (!normalizedTerm.includes(" ")) {
        const regex = new RegExp(`\\b${normalizedTerm}\\b`, "i");
        return regex.test(title) || regex.test(appId);
      }
      return title.includes(normalizedTerm) || appId.includes(normalizedTerm);
    });
    if (!relevantApps.length) {
      return { difficulty: 0, appsAnalyzed: 0 };
    }
    const appDetailPromises = relevantApps.map(async (app) => {
      try {
        if (storeType === "google") {
          const appInfo = await gplay.app({
            appId: app.appId,
            // app.appId đã có từ Bước 1
            country: country || "us",
            lang: "en"
          });
          return normalizeGPlayApp(appInfo);
        } else {
          const appInfo = await store.app({
            id: Number(app.id),
            // store.search trả về 'id'
            country: country || "us"
          });
          return normalizeAppleApp(appInfo);
        }
      } catch (e) {
        return null;
      }
    });
    const detailedApps = (await Promise.all(appDetailPromises)).filter(Boolean);
    const difficultyScore = calculateDifficulty(detailedApps, storeType);
    return {
      difficulty: difficultyScore,
      appsAnalyzed: detailedApps.length
      // Trả về số app đã dùng để tính
    };
  } catch (err) {
    console.error(err);
    return { error: err.message || "Cannot calculate difficulty" };
  }
});

export { difficulty_get as default };
//# sourceMappingURL=difficulty.get.mjs.map
