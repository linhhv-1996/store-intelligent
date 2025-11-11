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

const getIdFromUrl = ((url) => {
  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    return params.get("id");
  } catch (error) {
    return "com.example.app";
  }
});
const search_get = defineEventHandler(async (event) => {
  const { term, country = "us", store: storeType = "apple" } = getQuery(event);
  if (!term) {
    return { error: "Missing term" };
  }
  try {
    let apps = [];
    const numLimit = 99;
    if (storeType === "google") {
      apps = await gplay.search({
        term,
        country: country || "us",
        num: numLimit,
        lang: "en"
      });
      const trimmed = apps.map((a) => {
        var _a;
        return {
          title: a.title,
          // appId: a.appId,
          appId: getIdFromUrl(a.url),
          icon: a.icon,
          url: a.url,
          developer: a.developer,
          rating: (_a = a.score) != null ? _a : null,
          price: a.price,
          free: a.price ? false : true
        };
      });
      return trimmed;
    } else {
      apps = await store.search({
        term,
        country: country || "us",
        num: numLimit
      });
      const trimmed = apps.map((a) => {
        var _a, _b;
        return {
          title: a.title,
          appId: a.appId,
          icon: a.icon,
          url: a.url,
          developer: a.developer,
          rating: (_b = (_a = a.score) != null ? _a : a.scoreCurrentVersion) != null ? _b : null,
          price: a.price,
          free: a.free
        };
      });
      return trimmed;
    }
  } catch (err) {
    console.error(err);
    return { error: "Cannot search apps" };
  }
});

export { search_get as default };
//# sourceMappingURL=search.get.mjs.map
