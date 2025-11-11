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

const reviews_get = defineEventHandler(async (event) => {
  const { id, appId, country = "us", page = "1", token, store: storeType = "apple" } = getQuery(event);
  if (!id && !appId) {
    return { error: "Missing id or appId" };
  }
  try {
    let reviews = [];
    if (storeType === "google") {
      const gplayOptions = {
        appId,
        country: country || "us",
        lang: "en",
        sort: gplay.sort.NEWEST
      };
      if (token) {
        gplayOptions.token = token;
      } else {
        gplayOptions.num = 50;
      }
      const results = await gplay.reviews(gplayOptions);
      reviews = results.data || [];
      const normalized = reviews.map((r) => ({
        id: r.id,
        userName: r.userName,
        title: r.title,
        text: r.text,
        score: r.score,
        version: r.version,
        date: r.replyDate,
        url: r.url
      }));
      return {
        page: 1,
        // Google không dùng page
        count: normalized.length,
        reviews: normalized,
        nextPageToken: results.nextPaginationToken || null
        // Vẫn trả về token
      };
    } else {
      const pageNum = Number(page || "1") || 1;
      reviews = await store.reviews({
        id: id ? Number(id) : void 0,
        appId: appId || void 0,
        country: country || "us",
        page: pageNum,
        sort: store.sort.RECENT
      });
      const normalized = reviews.map((r) => ({
        id: r.id,
        userName: r.userName,
        title: r.title,
        text: r.text,
        score: r.score,
        version: r.version,
        date: r.updated,
        url: r.url
      }));
      return {
        page: pageNum,
        count: normalized.length,
        reviews: normalized,
        nextPageToken: null
        // Apple không dùng token
      };
    }
  } catch (err) {
    console.error(err);
    return { error: "Cannot fetch reviews" };
  }
});

export { reviews_get as default };
//# sourceMappingURL=reviews.get.mjs.map
