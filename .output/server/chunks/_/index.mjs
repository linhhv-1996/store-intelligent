import { a as getDefaultExportFromNamespaceIfNotNamed, p as proxyManager, b as getDefaultExportFromCjs } from '../nitro/nitro.mjs';
import * as R$4 from 'ramda';
import * as memoizee$1 from 'memoizee';
import memoizee__default from 'memoizee';
import * as request$2 from 'request';
import * as throttledRequest$1 from 'throttled-request';
import * as cheerio$1 from 'cheerio';
import * as xml2js from 'xml2js';
import qs from 'querystring';
import requestLib from 'got';
import url from 'url';

const require$$0$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(R$4);

const require$$1$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(memoizee$1);

const collection = {
  TOP_MAC: "topmacapps",
  TOP_FREE_MAC: "topfreemacapps",
  TOP_GROSSING_MAC: "topgrossingmacapps",
  TOP_PAID_MAC: "toppaidmacapps",
  NEW_IOS: "newapplications",
  NEW_FREE_IOS: "newfreeapplications",
  NEW_PAID_IOS: "newpaidapplications",
  TOP_FREE_IOS: "topfreeapplications",
  TOP_FREE_IPAD: "topfreeipadapplications",
  TOP_GROSSING_IOS: "topgrossingapplications",
  TOP_GROSSING_IPAD: "topgrossingipadapplications",
  TOP_PAID_IOS: "toppaidapplications",
  TOP_PAID_IPAD: "toppaidipadapplications"
};
const category = {
  BOOKS: 6018,
  BUSINESS: 6e3,
  CATALOGS: 6022,
  EDUCATION: 6017,
  ENTERTAINMENT: 6016,
  FINANCE: 6015,
  FOOD_AND_DRINK: 6023,
  GAMES: 6014,
  GAMES_ACTION: 7001,
  GAMES_ADVENTURE: 7002,
  GAMES_ARCADE: 7003,
  GAMES_BOARD: 7004,
  GAMES_CARD: 7005,
  GAMES_CASINO: 7006,
  GAMES_DICE: 7007,
  GAMES_EDUCATIONAL: 7008,
  GAMES_FAMILY: 7009,
  GAMES_MUSIC: 7011,
  GAMES_PUZZLE: 7012,
  GAMES_RACING: 7013,
  GAMES_ROLE_PLAYING: 7014,
  GAMES_SIMULATION: 7015,
  GAMES_SPORTS: 7016,
  GAMES_STRATEGY: 7017,
  GAMES_TRIVIA: 7018,
  GAMES_WORD: 7019,
  HEALTH_AND_FITNESS: 6013,
  LIFESTYLE: 6012,
  MAGAZINES_AND_NEWSPAPERS: 6021,
  MAGAZINES_ARTS: 13007,
  MAGAZINES_AUTOMOTIVE: 13006,
  MAGAZINES_WEDDINGS: 13008,
  MAGAZINES_BUSINESS: 13009,
  MAGAZINES_CHILDREN: 13010,
  MAGAZINES_COMPUTER: 13011,
  MAGAZINES_FOOD: 13012,
  MAGAZINES_CRAFTS: 13013,
  MAGAZINES_ELECTRONICS: 13014,
  MAGAZINES_ENTERTAINMENT: 13015,
  MAGAZINES_FASHION: 13002,
  MAGAZINES_HEALTH: 13017,
  MAGAZINES_HISTORY: 13018,
  MAGAZINES_HOME: 13003,
  MAGAZINES_LITERARY: 13019,
  MAGAZINES_MEN: 13020,
  MAGAZINES_MOVIES_AND_MUSIC: 13021,
  MAGAZINES_POLITICS: 13001,
  MAGAZINES_OUTDOORS: 13004,
  MAGAZINES_FAMILY: 13023,
  MAGAZINES_PETS: 13024,
  MAGAZINES_PROFESSIONAL: 13025,
  MAGAZINES_REGIONAL: 13026,
  MAGAZINES_SCIENCE: 13027,
  MAGAZINES_SPORTS: 13005,
  MAGAZINES_TEENS: 13028,
  MAGAZINES_TRAVEL: 13029,
  MAGAZINES_WOMEN: 13030,
  MEDICAL: 6020,
  MUSIC: 6011,
  NAVIGATION: 6010,
  NEWS: 6009,
  PHOTO_AND_VIDEO: 6008,
  PRODUCTIVITY: 6007,
  REFERENCE: 6006,
  SHOPPING: 6024,
  SOCIAL_NETWORKING: 6005,
  SPORTS: 6004,
  TRAVEL: 6003,
  UTILITIES: 6002,
  WEATHER: 6001
};
const device = {
  IPAD: "iPadSoftware",
  MAC: "macSoftware",
  ALL: "software"
};
const sort = {
  RECENT: "mostRecent",
  HELPFUL: "mostHelpful"
};
const markets = {
  DZ: 143563,
  AO: 143564,
  AI: 143538,
  AR: 143505,
  AM: 143524,
  AU: 143460,
  AT: 143445,
  AZ: 143568,
  BH: 143559,
  BB: 143541,
  BY: 143565,
  BE: 143446,
  BZ: 143555,
  BM: 143542,
  BO: 143556,
  BW: 143525,
  BR: 143503,
  VG: 143543,
  BN: 143560,
  BG: 143526,
  CA: 143455,
  KY: 143544,
  CL: 143483,
  CN: 143465,
  CO: 143501,
  CR: 143495,
  HR: 143494,
  CY: 143557,
  CZ: 143489,
  DK: 143458,
  DM: 143545,
  EC: 143509,
  EG: 143516,
  SV: 143506,
  EE: 143518,
  FI: 143447,
  FR: 143442,
  DE: 143443,
  GB: 143444,
  GH: 143573,
  GR: 143448,
  GD: 143546,
  GT: 143504,
  GY: 143553,
  HN: 143510,
  HK: 143463,
  HU: 143482,
  IS: 143558,
  IN: 143467,
  ID: 143476,
  IE: 143449,
  IL: 143491,
  IT: 143450,
  JM: 143511,
  JP: 143462,
  JO: 143528,
  KE: 143529,
  KR: 143466,
  KW: 143493,
  LV: 143519,
  LB: 143497,
  LT: 143520,
  LU: 143451,
  MO: 143515,
  MK: 143530,
  MG: 143531,
  MY: 143473,
  ML: 143532,
  MT: 143521,
  MU: 143533,
  MX: 143468,
  MS: 143547,
  NP: 143484,
  NL: 143452,
  NZ: 143461,
  NI: 143512,
  NE: 143534,
  NG: 143561,
  NO: 143457,
  OM: 143562,
  PK: 143477,
  PA: 143485,
  PY: 143513,
  PE: 143507,
  PH: 143474,
  PL: 143478,
  PT: 143453,
  QA: 143498,
  RO: 143487,
  RU: 143469,
  SA: 143479,
  SN: 143535,
  SG: 143464,
  SK: 143496,
  SI: 143499,
  ZA: 143472,
  ES: 143454,
  LK: 143486,
  SR: 143554,
  SE: 143456,
  CH: 143459,
  TW: 143470,
  TZ: 143572,
  TH: 143475,
  TN: 143536,
  TR: 143480,
  UG: 143537,
  UA: 143492,
  AE: 143481,
  US: 143441,
  UY: 143514,
  UZ: 143566,
  VE: 143502,
  VN: 143471,
  YE: 143571
};
var constants$2 = { collection, category, device, sort, markets };

const require$$0$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(request$2);

const require$$1$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(throttledRequest$1);

const request$1 = require$$0$1;
const throttled = require$$1$1(request$1);
const c$2 = constants$2;
const { getProxyAgentByIndex, getProxyCount } = proxyManager;
function cleanApp$1(app) {
  return {
    id: app.trackId,
    appId: app.bundleId,
    title: app.trackName,
    url: app.trackViewUrl,
    description: app.description,
    icon: app.artworkUrl512 || app.artworkUrl100 || app.artworkUrl60,
    genres: app.genres,
    genreIds: app.genreIds,
    primaryGenre: app.primaryGenreName,
    primaryGenreId: app.primaryGenreId,
    contentRating: app.contentAdvisoryRating,
    languages: app.languageCodesISO2A,
    size: app.fileSizeBytes,
    requiredOsVersion: app.minimumOsVersion,
    released: app.releaseDate,
    updated: app.currentVersionReleaseDate || app.releaseDate,
    releaseNotes: app.releaseNotes,
    version: app.version,
    price: app.price,
    currency: app.currency,
    free: app.price === 0,
    developerId: app.artistId,
    developer: app.artistName,
    developerUrl: app.artistViewUrl,
    developerWebsite: app.sellerUrl,
    score: app.averageUserRating,
    reviews: app.userRatingCount,
    currentVersionScore: app.averageUserRatingForCurrentVersion,
    currentVersionReviews: app.userRatingCountForCurrentVersion,
    screenshots: app.screenshotUrls,
    ipadScreenshots: app.ipadScreenshotUrls,
    appletvScreenshots: app.appletvScreenshotUrls,
    supportedDevices: app.supportedDevices
  };
}
const doRequest$1 = (url, headers, requestOptions, limit) => {
  const attemptRequest = (agent) => new Promise(function(resolve, reject) {
    requestOptions = Object.assign({ method: "GET" }, requestOptions);
    let req = request$1;
    if (limit) {
      throttled.configure({
        requests: limit,
        milliseconds: 1e3
      });
      req = throttled;
    }
    const options = Object.assign({
      url,
      headers,
      agent
    }, requestOptions);
    req(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      if (response.statusCode >= 400) {
        return reject({ response });
      }
      resolve(body);
    });
  });
  return new Promise(async (resolve, reject) => {
    var _a;
    let lastError;
    const totalAttempts = getProxyCount() > 0 ? getProxyCount() : 1;
    for (let attemptIndex = 0; attemptIndex <= totalAttempts; attemptIndex++) {
      let agent = void 0;
      if (attemptIndex) {
        agent = getProxyAgentByIndex(attemptIndex);
      }
      try {
        console.log(`Request attempt ${attemptIndex}/${totalAttempts}...`);
        const body = await attemptRequest(agent);
        return resolve(body);
      } catch (error) {
        console.log(`Request error (attempt ${attemptIndex}/${totalAttempts}):`, error.message || ((_a = error.response) == null ? void 0 : _a.statusCode));
        lastError = error;
      }
    }
    console.log(`Request failed after ${totalAttempts} attempts.`);
    reject(lastError);
  });
};
const LOOKUP_URL = "https://itunes.apple.com/lookup";
function lookup(ids, idField, country, lang, requestOptions, limit) {
  idField = idField || "id";
  country = country || "us";
  const langParam = lang ? `&lang=${lang}` : "";
  const joinedIds = ids.join(",");
  const url = `${LOOKUP_URL}?${idField}=${joinedIds}&country=${country}&entity=software${langParam}`;
  return doRequest$1(url, {}, requestOptions, limit).then(JSON.parse).then((res) => res.results.filter(function(app) {
    return typeof app.wrapperType === "undefined" || app.wrapperType === "software";
  })).then((res) => res.map(cleanApp$1));
}
function storeId(countryCode) {
  const markets = c$2.markets;
  const defaultStore = "143441";
  return countryCode && markets[countryCode.toUpperCase()] || defaultStore;
}
var common$9 = { cleanApp: cleanApp$1, lookup, request: doRequest$1, storeId };

const require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(cheerio$1);

const cheerio = require$$0;
const common$8 = common$9;
function ratings$1(opts) {
  return new Promise(function(resolve) {
    if (!opts.id) {
      throw Error("id is required");
    }
    const country = opts.country || "us";
    const storeFront = common$8.storeId(opts.country);
    const idValue = opts.id;
    const url = `https://itunes.apple.com/${country}/customer-reviews/id${idValue}?displayable-kind=11`;
    resolve(common$8.request(url, {
      "X-Apple-Store-Front": `${storeFront},12`
    }, opts.requestOptions));
  }).then((html) => {
    if (html.length === 0) {
      throw Error("App not found (404)");
    }
    return parseRatings(html);
  });
}
var ratings_1 = ratings$1;
function parseRatings(html) {
  const $ = cheerio.load(html);
  const ratingsMatch = $(".rating-count").text().match(/\d+/);
  const ratings2 = Array.isArray(ratingsMatch) ? parseInt(ratingsMatch[0]) : 0;
  const ratingsByStar = $(".vote .total").map((i, el) => parseInt($(el).text())).get();
  const histogram = ratingsByStar.reduce((acc, ratingsForStar, index) => {
    return Object.assign(acc, { [5 - index]: ratingsForStar });
  }, {});
  return { ratings: ratings2, histogram };
}

const common$7 = common$9;
const ratings = ratings_1;
function app$3(opts) {
  return new Promise(function(resolve) {
    if (!opts.id && !opts.appId) {
      throw Error("Either id or appId is required");
    }
    const idField = opts.id ? "id" : "bundleId";
    const idValue = opts.id || opts.appId;
    resolve(common$7.lookup([idValue], idField, opts.country, opts.lang, opts.requestOptions, opts.throttle));
  }).then((results) => {
    if (results.length === 0) {
      throw Error("App not found (404)");
    }
    const result = results[0];
    if (opts.ratings) {
      if (!opts.id) {
        opts.id = result.id;
      }
      return ratings(opts).then((ratingsResult) => Object.assign({}, result, ratingsResult));
    }
    return result;
  });
}
var app_1 = app$3;

const R$3 = require$$0$2;
const common$6 = common$9;
const c$1 = constants$2;
function parseLink(app) {
  if (app.link) {
    const linkArray = Array.isArray(app.link) ? app.link : [app.link];
    const link = linkArray.find((link2) => link2.attributes.rel === "alternate");
    return link && link.attributes.href;
  }
  return void 0;
}
function cleanApp(app) {
  let developerUrl, developerId;
  if (app["im:artist"].attributes) {
    developerUrl = app["im:artist"].attributes.href;
    if (app["im:artist"].attributes.href.includes("/id")) {
      developerId = app["im:artist"].attributes.href.split("/id")[1].split("?mt")[0];
    }
  }
  const price = parseFloat(app["im:price"].attributes.amount);
  return {
    id: app.id.attributes["im:id"],
    appId: app.id.attributes["im:bundleId"],
    title: app["im:name"].label,
    icon: app["im:image"][app["im:image"].length - 1].label,
    url: parseLink(app),
    price,
    currency: app["im:price"].attributes.currency,
    free: price === 0,
    description: app.summary ? app.summary.label : void 0,
    developer: app["im:artist"].label,
    developerUrl,
    developerId,
    genre: app.category.attributes.label,
    genreId: app.category.attributes["im:id"],
    released: app["im:releaseDate"].label
  };
}
function processResults(opts) {
  return function(results) {
    const apps = results.feed.entry;
    if (opts.fullDetail) {
      const ids = apps.map((app) => app.id.attributes["im:id"]);
      return common$6.lookup(ids, "id", opts.country, opts.lang, opts.requestOptions, opts.throttle);
    }
    return apps.map(cleanApp);
  };
}
function validate$3(opts) {
  if (opts.category && !R$3.includes(opts.category, R$3.values(c$1.category))) {
    throw Error("Invalid category " + opts.category);
  }
  opts.collection = opts.collection || c$1.collection.TOP_FREE_IOS;
  if (!R$3.includes(opts.collection, R$3.values(c$1.collection))) {
    throw Error(`Invalid collection ${opts.collection}`);
  }
  opts.num = opts.num || 50;
  if (opts.num > 200) {
    throw Error("Cannot retrieve more than 200 apps");
  }
  opts.country = opts.country || "us";
}
function list$1(opts) {
  return new Promise(function(resolve, reject) {
    opts = R$3.clone(opts || {});
    validate$3(opts);
    const category = opts.category ? `/genre=${opts.category}` : "";
    const storeId = common$6.storeId(opts.country);
    const url = `http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/${opts.collection}/${category}/limit=${opts.num}/json?s=${storeId}`;
    common$6.request(url, {}, opts.requestOptions).then(JSON.parse).then(processResults(opts)).then(resolve).catch(reject);
  });
}
var list_1 = list$1;

const R$2 = require$$0$2;
const common$5 = common$9;
const BASE_URL$3 = "https://search.itunes.apple.com/WebObjects/MZStore.woa/wa/search?clientApplication=Software&media=software&term=";
function paginate(num, page) {
  num = num || 50;
  page = page - 1 || 0;
  const pageStart = num * page;
  const pageEnd = pageStart + num;
  return R$2.slice(pageStart, pageEnd);
}
function search$1(opts) {
  return new Promise(function(resolve, reject) {
    if (!opts.term) {
      throw Error("term is required");
    }
    const url = BASE_URL$3 + encodeURIComponent(opts.term);
    const storeId = common$5.storeId(opts.country);
    const lang = opts.lang || "en-us";
    common$5.request(
      url,
      {
        "X-Apple-Store-Front": `${storeId},24 t:native`,
        "Accept-Language": lang
      },
      opts.requestOptions
    ).then(JSON.parse).then((response) => response.bubbles[0] && response.bubbles[0].results || []).then(paginate(opts.num, opts.page)).then(R$2.pluck("id")).then((ids) => {
      if (!opts.idsOnly) {
        return common$5.lookup(ids, "id", opts.country, opts.lang, opts.requestOptions, opts.throttle);
      }
      return ids;
    }).then(resolve).catch(reject);
  });
}
var search_1 = search$1;

const common$4 = common$9;
function developer$1(opts) {
  return new Promise(function(resolve) {
    if (!opts.devId) {
      throw Error("devId is required");
    }
    resolve(common$4.lookup([opts.devId], "id", opts.country, opts.lang, opts.requestOptions, opts.throttle));
  }).then((results) => {
    if (results.length === 0) {
      throw Error("Developer not found (404)");
    }
    return results;
  });
}
var developer_1 = developer$1;

const common$3 = common$9;
function privacy(opts) {
  opts.country = opts.country || "US";
  return new Promise((resolve) => {
    if (opts.id) {
      resolve();
    } else {
      throw Error("Either id or appId is required");
    }
  }).then(() => {
    const tokenUrl = `https://apps.apple.com/${opts.country}/app/id${opts.id}`;
    return common$3.request(tokenUrl, {}, opts.requestOptions);
  }).then((html) => {
    const regExp = /token%22%3A%22([^%]+)%22%7D/g;
    const match = regExp.exec(html);
    const token = match[1];
    const url = `https://amp-api.apps.apple.com/v1/catalog/${opts.country}/apps/${opts.id}?platform=web&fields=privacyDetails`;
    return common$3.request(url, {
      "Origin": "https://apps.apple.com",
      "Authorization": `Bearer ${token}`
    }, opts.requestOptions);
  }).then((json) => {
    if (json.length === 0) {
      throw Error("App not found (404)");
    }
    return JSON.parse(json).data[0].attributes.privacyDetails;
  });
}
var privacy_1 = privacy;

const require$$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(xml2js);

const common$2 = common$9;
const parseString = require$$1.parseString;
const BASE_URL$2 = "https://search.itunes.apple.com/WebObjects/MZSearchHints.woa/wa/hints?clientApplication=Software&term=";
function parseXML(string) {
  return new Promise(function(resolve, reject) {
    return parseString(string, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}
function extractSuggestions(xml) {
  const toJSON = (item) => ({
    term: item.string[0]
  });
  const list = xml.plist.dict[0].array[0].dict || [];
  return list.map(toJSON);
}
function suggest$1(opts) {
  return new Promise(function(resolve) {
    if (!opts && !opts.term) {
      throw Error("term missing");
    }
    return resolve(BASE_URL$2 + encodeURIComponent(opts.term));
  }).then((url) => common$2.request(url, { "X-Apple-Store-Front": `${common$2.storeId(opts.country)},29` }, opts.requestOptions)).then(parseXML).then(extractSuggestions);
}
var suggest_1 = suggest$1;

const app$2 = app_1;
const BASE_URL$1 = "https://itunes.apple.com/us/app/app/id";
const common$1 = common$9;
function similar$1(opts) {
  return new Promise(function(resolve, reject) {
    if (opts.id) {
      resolve(opts.id);
    } else if (opts.appId) {
      app$2(opts).then((app2) => resolve(app2.id)).catch(reject);
    } else {
      throw Error("Either id or appId is required");
    }
  }).then((id) => common$1.request(
    `${BASE_URL$1}${id}`,
    {
      "X-Apple-Store-Front": `${common$1.storeId(opts.country)},32`
    },
    opts.requestOptions
  )).then(function(text) {
    const index = text.indexOf("customersAlsoBoughtApps");
    if (index === -1) {
      return [];
    }
    const regExp = /customersAlsoBoughtApps":(.*?\])/g;
    const match = regExp.exec(text);
    const ids = JSON.parse(match[1]);
    return common$1.lookup(ids, "id", opts.country, opts.lang, opts.requestOptions, opts.throttle);
  });
}
var similar_1 = similar$1;

const R$1 = require$$0$2;
const common = common$9;
const app$1 = app_1;
const c = constants$2;
function ensureArray(value) {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}
function cleanList(results) {
  const reviews2 = ensureArray(results.feed.entry);
  return reviews2.map((review) => ({
    id: review.id.label,
    userName: review.author.name.label,
    userUrl: review.author.uri.label,
    version: review["im:version"].label,
    score: parseInt(review["im:rating"].label),
    title: review.title.label,
    text: review.content.label,
    url: review.link.attributes.href,
    updated: review.updated.label
  }));
}
const reviews$1 = (opts) => new Promise((resolve) => {
  validate$2(opts);
  if (opts.id) {
    resolve(opts.id);
  } else if (opts.appId) {
    resolve(app$1(opts).then((app2) => app2.id));
  }
}).then((id) => {
  opts = opts || {};
  opts.sort = opts.sort || c.sort.RECENT;
  opts.page = opts.page || 1;
  opts.country = opts.country || "us";
  const url = `https://itunes.apple.com/${opts.country}/rss/customerreviews/page=${opts.page}/id=${id}/sortby=${opts.sort}/json`;
  return common.request(url, {}, opts.requestOptions);
}).then(JSON.parse).then(cleanList);
function validate$2(opts) {
  if (!opts.id && !opts.appId) {
    throw Error("Either id or appId is required");
  }
  if (opts.sort && !R$1.includes(opts.sort, R$1.values(c.sort))) {
    throw new Error("Invalid sort " + opts.sort);
  }
  if (opts.page && opts.page < 1) {
    throw new Error("Page cannot be lower than 1");
  }
  if (opts.page && opts.page > 10) {
    throw new Error("Page cannot be greater than 10");
  }
}
var reviews_1 = reviews$1;

const R = require$$0$2;
const memoizee = require$$1$2;
const constants$1 = constants$2;
const methods$1 = {
  app: app_1,
  list: list_1,
  search: search_1,
  developer: developer_1,
  privacy: privacy_1,
  suggest: suggest_1,
  similar: similar_1,
  reviews: reviews_1,
  ratings: ratings_1
};
function memoized$1(opts) {
  const cacheOpts = Object.assign({
    primitive: true,
    normalizer: JSON.stringify,
    maxAge: 1e3 * 60 * 5,
    // cache for 5 minutes
    max: 1e3
    // save up to 1k results to avoid memory issues
  }, opts);
  const doMemoize = (fn) => memoizee(fn, cacheOpts);
  return Object.assign({}, constants$1, R.map(doMemoize, methods$1));
}
var appStoreScraper = Object.assign({ memoized: memoized$1 }, constants$1, methods$1);

const store = /*@__PURE__*/getDefaultExportFromCjs(appStoreScraper);

const BASE_URL = "https://play.google.com";
const constants = {
  clusters: {
    new: "new",
    top: "top"
  },
  category: {
    APPLICATION: "APPLICATION",
    ANDROID_WEAR: "ANDROID_WEAR",
    ART_AND_DESIGN: "ART_AND_DESIGN",
    AUTO_AND_VEHICLES: "AUTO_AND_VEHICLES",
    BEAUTY: "BEAUTY",
    BOOKS_AND_REFERENCE: "BOOKS_AND_REFERENCE",
    BUSINESS: "BUSINESS",
    COMICS: "COMICS",
    COMMUNICATION: "COMMUNICATION",
    DATING: "DATING",
    EDUCATION: "EDUCATION",
    ENTERTAINMENT: "ENTERTAINMENT",
    EVENTS: "EVENTS",
    FINANCE: "FINANCE",
    FOOD_AND_DRINK: "FOOD_AND_DRINK",
    HEALTH_AND_FITNESS: "HEALTH_AND_FITNESS",
    HOUSE_AND_HOME: "HOUSE_AND_HOME",
    LIBRARIES_AND_DEMO: "LIBRARIES_AND_DEMO",
    LIFESTYLE: "LIFESTYLE",
    MAPS_AND_NAVIGATION: "MAPS_AND_NAVIGATION",
    MEDICAL: "MEDICAL",
    MUSIC_AND_AUDIO: "MUSIC_AND_AUDIO",
    NEWS_AND_MAGAZINES: "NEWS_AND_MAGAZINES",
    PARENTING: "PARENTING",
    PERSONALIZATION: "PERSONALIZATION",
    PHOTOGRAPHY: "PHOTOGRAPHY",
    PRODUCTIVITY: "PRODUCTIVITY",
    SHOPPING: "SHOPPING",
    SOCIAL: "SOCIAL",
    SPORTS: "SPORTS",
    TOOLS: "TOOLS",
    TRAVEL_AND_LOCAL: "TRAVEL_AND_LOCAL",
    VIDEO_PLAYERS: "VIDEO_PLAYERS",
    WATCH_FACE: "WATCH_FACE",
    WEATHER: "WEATHER",
    GAME: "GAME",
    GAME_ACTION: "GAME_ACTION",
    GAME_ADVENTURE: "GAME_ADVENTURE",
    GAME_ARCADE: "GAME_ARCADE",
    GAME_BOARD: "GAME_BOARD",
    GAME_CARD: "GAME_CARD",
    GAME_CASINO: "GAME_CASINO",
    GAME_CASUAL: "GAME_CASUAL",
    GAME_EDUCATIONAL: "GAME_EDUCATIONAL",
    GAME_MUSIC: "GAME_MUSIC",
    GAME_PUZZLE: "GAME_PUZZLE",
    GAME_RACING: "GAME_RACING",
    GAME_ROLE_PLAYING: "GAME_ROLE_PLAYING",
    GAME_SIMULATION: "GAME_SIMULATION",
    GAME_SPORTS: "GAME_SPORTS",
    GAME_STRATEGY: "GAME_STRATEGY",
    GAME_TRIVIA: "GAME_TRIVIA",
    GAME_WORD: "GAME_WORD",
    FAMILY: "FAMILY"
  },
  collection: {
    TOP_FREE: "TOP_FREE",
    TOP_PAID: "TOP_PAID",
    GROSSING: "GROSSING"
  },
  sort: {
    NEWEST: 2,
    RATING: 3,
    HELPFULNESS: 1
  },
  age: {
    FIVE_UNDER: "AGE_RANGE1",
    SIX_EIGHT: "AGE_RANGE2",
    NINE_UP: "AGE_RANGE3"
  },
  permission: {
    COMMON: 0,
    OTHER: 1
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function Throttle() {
  let startedAt = null;
  let timesCalled = 0;
  let inThrottle = false;
  return function settingOptions(fn, opts) {
    const ms = opts.interval;
    const number = opts.limit;
    return async function returnedFunction(...args) {
      if (!startedAt) startedAt = Date.now();
      if (timesCalled < number && Date.now() - startedAt < ms) {
        timesCalled++;
        const result2 = await fn(...args);
        return result2;
      }
      if (!inThrottle) {
        inThrottle = true;
        await sleep(ms);
        timesCalled = 0;
        startedAt = Date.now();
        const result2 = await returnedFunction(...args);
        inThrottle = false;
        return result2;
      }
      const checkingPromise = new Promise((resolve) => {
        const interval = setInterval(async () => {
          if (!inThrottle) {
            clearInterval(interval);
            const result2 = await returnedFunction(...args);
            return resolve(result2);
          }
        }, 1);
      });
      const result = await checkingPromise;
      return result;
    };
  };
}
const throttledRequest = Throttle();

function createDebug(namespace) {
	return Object.assign((...args) => {
		const env = globalThis.process?.env.DEBUG;
		if (!env || env !== "*" && !env.startsWith(namespace)) return;
		console.debug(...args);
	}, {
		color: "#000000",
		diff: 0,
		enabled: true,
		log: console.debug.bind(console),
		namespace,
		destroy: () => false,
		extend: (ns, _del) => createDebug(namespace + ns)
	});
}
const debug$8 = Object.assign(createDebug, {
	coerce: (val) => val,
	disable: () => "",
	enable: (_namespaces) => {},
	enabled: (_namespaces) => true,
	formatArgs(args) {
		args[0] = `${this.namespace} ${args[0]}`;
	},
	log: console.debug.bind(console),
	selectColor: (_namespace) => 0,
	humanize: (num) => `${num}ms`,
	inspectOpts: {},
	names: [],
	skips: [],
	formatters: {}
});
debug$8.coerce;
debug$8.disable;
debug$8.enable;
debug$8.enabled;
debug$8.formatArgs;
debug$8.log;
debug$8.selectColor;
debug$8.humanize;
debug$8.names;
debug$8.skips;
debug$8.formatters;

const debug$7 = debug$8("google-play-scraper");
function doRequest(opts, limit) {
  let req;
  if (limit) {
    req = throttledRequest(
      requestLib,
      {
        interval: 1e3,
        limit
      }
    );
  } else {
    req = requestLib;
  }
  return new Promise((resolve, reject) => {
    req(opts).then((response) => resolve(response.body)).catch((error) => reject(error));
  });
}
async function request(opts, limit) {
  debug$7("Making request: %j", opts);
  let lastError;
  const totalAttempts = proxyManager.getProxyCount() > 0 ? proxyManager.getProxyCount() : 1;
  for (let attemptIndex = 0; attemptIndex <= totalAttempts; attemptIndex++) {
    let agent = void 0;
    if (attemptIndex) {
      agent = proxyManager.getProxyAgentByIndex(attemptIndex);
    }
    const optionsWithProxy = {
      ...opts,
      agent: agent ? { https: agent } : void 0
    };
    try {
      console.log(agent);
      console.log(`Request attempt ${attemptIndex}/${totalAttempts}...`);
      const response = await doRequest(optionsWithProxy, limit);
      console.log(`Request finished (attempt ${attemptIndex})`);
      return response;
    } catch (reason) {
      console.log(`Request error (attempt ${attemptIndex}/${totalAttempts}):`, reason.message);
      lastError = reason;
    }
  }
  console.log(`Request failed after ${totalAttempts} attempts.`);
  let message = "Error requesting Google Play:" + (lastError ? lastError.message : "Unknown Error");
  if (lastError && lastError.response && lastError.response.statusCode === 404) {
    message = "App not found (404)";
  }
  const err = Error(message);
  err.status = lastError && lastError.response && lastError.response.statusCode;
  throw err;
}

const debug$6 = debug$8("google-play-scraper:scriptData");
function extractDataWithServiceRequestId(parsedData, spec) {
  const serviceRequestMapping = Object.keys(parsedData.serviceRequestData);
  const filteredDsRootPath = serviceRequestMapping.filter((serviceRequest) => {
    const dsValues = parsedData.serviceRequestData[serviceRequest];
    return dsValues.id === spec.useServiceRequestId;
  });
  const formattedPath = filteredDsRootPath.length ? [filteredDsRootPath[0], ...spec.path] : spec.path;
  return R$4.path(formattedPath, parsedData);
}
function extractor(mappings) {
  return function extractFields(parsedData) {
    debug$6("parsedData: %o", parsedData);
    return R$4.map((spec) => {
      if (R$4.is(Array, spec)) {
        return R$4.path(spec, parsedData);
      }
      const input = spec.useServiceRequestId ? extractDataWithServiceRequestId(parsedData, spec) : R$4.path(spec.path, parsedData);
      return spec.fun(input, parsedData);
    }, mappings);
  };
}
function parse(response2) {
  const scriptRegex2 = />AF_initDataCallback[\s\S]*?<\/script/g;
  const keyRegex = /(ds:.*?)'/;
  const valueRegex2 = /data:([\s\S]*?), sideChannel: {}}\);<\//;
  const matches2 = response2.match(scriptRegex2);
  if (!matches2) {
    return {};
  }
  const parsedData = matches2.reduce((accum, data2) => {
    const keyMatch = data2.match(keyRegex);
    const valueMatch2 = data2.match(valueRegex2);
    if (keyMatch && valueMatch2) {
      const key = keyMatch[1];
      const value2 = JSON.parse(valueMatch2[1]);
      return R$4.assoc(key, value2, accum);
    }
    return accum;
  }, {});
  return Object.assign(
    {},
    parsedData,
    { serviceRequestData: parseServiceRequests(response2) }
  );
}
function parseServiceRequests(response) {
  const scriptRegex = /; var AF_dataServiceRequests[\s\S]*?; var AF_initDataChunkQueue/g;
  const valueRegex = /{'ds:[\s\S]*}}/g;
  const matches = response.match(scriptRegex);
  if (!matches) {
    return {};
  }
  const [data] = matches;
  const valueMatch = data.match(valueRegex);
  if (!valueMatch) {
    return {};
  }
  const value = eval(`(${valueMatch[0]})`);
  return value;
}
const scriptData = Object.assign({ parse, parseServiceRequests, extractor, extractDataWithServiceRequestId });

function descriptionHtmlLocalized(searchArray) {
  const descriptionTranslation = R$4.path([12, 0, 0, 1], searchArray);
  const descriptionOriginal = R$4.path([72, 0, 1], searchArray);
  return descriptionTranslation || descriptionOriginal;
}
function descriptionText(description) {
  const html = cheerio$1.load("<div>" + description.replace(/<br>/g, "\r\n") + "</div>");
  return html("div").text();
}
function priceText(priceText2) {
  return priceText2 || "Free";
}
function normalizeAndroidVersion(androidVersionText) {
  if (!androidVersionText) return "VARY";
  const number = androidVersionText.split(" ")[0];
  if (parseFloat(number)) {
    return number;
  }
  return "VARY";
}
function buildHistogram(container) {
  if (!container) {
    return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  }
  return {
    1: container[1][1],
    2: container[2][1],
    3: container[3][1],
    4: container[4][1],
    5: container[5][1]
  };
}
function extractComments(comments) {
  if (!comments) return [];
  return comments.map(R$4.path([4])).slice(0, 5);
}
function extractFeatures(featuresArray) {
  if (featuresArray === null) {
    return [];
  }
  const features = featuresArray[2] || [];
  return features.map((feature) => ({
    title: feature[0],
    description: R$4.path([1, 0, 0, 1], feature)
  }));
}
function extractCategories$1(searchArray, categories = []) {
  if (searchArray === null || searchArray.length === 0) return categories;
  if (searchArray.length >= 4 && typeof searchArray[0] === "string") {
    categories.push({
      name: searchArray[0],
      id: searchArray[2]
    });
  } else {
    searchArray.forEach((sub) => {
      extractCategories$1(sub, categories);
    });
  }
  return categories;
}
const helper = {
  descriptionHtmlLocalized,
  descriptionText,
  priceText,
  normalizeAndroidVersion,
  buildHistogram,
  extractComments,
  extractFeatures,
  extractCategories: extractCategories$1
};

const PLAYSTORE_URL$1 = `${BASE_URL}/store/apps/details`;
function app(opts) {
  return new Promise(function(resolve, reject) {
    if (!opts || !opts.appId) {
      throw Error("appId missing");
    }
    opts.lang = opts.lang || "en";
    opts.country = opts.country || "us";
    const qs$1 = qs.stringify({
      id: opts.appId,
      hl: opts.lang,
      gl: opts.country
    });
    const reqUrl = `${PLAYSTORE_URL$1}?${qs$1}`;
    const options = Object.assign({
      url: reqUrl,
      followRedirect: true
    }, opts.requestOptions);
    request(options, opts.throttle).then(scriptData.parse).then(scriptData.extractor(MAPPINGS$3)).then(R$4.assoc("appId", opts.appId)).then(R$4.assoc("url", reqUrl)).then(resolve).catch(reject);
  });
}
const MAPPINGS$3 = {
  title: ["ds:5", 1, 2, 0, 0],
  description: {
    path: ["ds:5", 1, 2],
    fun: (val) => helper.descriptionText(helper.descriptionHtmlLocalized(val))
  },
  descriptionHTML: {
    path: ["ds:5", 1, 2],
    fun: helper.descriptionHtmlLocalized
  },
  summary: ["ds:5", 1, 2, 73, 0, 1],
  installs: ["ds:5", 1, 2, 13, 0],
  minInstalls: ["ds:5", 1, 2, 13, 1],
  maxInstalls: ["ds:5", 1, 2, 13, 2],
  score: ["ds:5", 1, 2, 51, 0, 1],
  scoreText: ["ds:5", 1, 2, 51, 0, 0],
  ratings: ["ds:5", 1, 2, 51, 2, 1],
  reviews: ["ds:5", 1, 2, 51, 3, 1],
  histogram: {
    path: ["ds:5", 1, 2, 51, 1],
    fun: helper.buildHistogram
  },
  price: {
    path: ["ds:5", 1, 2, 57, 0, 0, 0, 0, 1, 0, 0],
    fun: (val) => val / 1e6 || 0
  },
  // If there is a discount, originalPrice if filled.
  originalPrice: {
    path: ["ds:5", 1, 2, 57, 0, 0, 0, 0, 1, 1, 0],
    fun: (price) => price ? price / 1e6 : void 0
  },
  discountEndDate: ["ds:5", 1, 2, 57, 0, 0, 0, 0, 14, 1],
  free: {
    path: ["ds:5", 1, 2, 57, 0, 0, 0, 0, 1, 0, 0],
    // considered free only if price is exactly zero
    fun: (val) => val === 0
  },
  currency: ["ds:5", 1, 2, 57, 0, 0, 0, 0, 1, 0, 1],
  priceText: {
    path: ["ds:5", 1, 2, 57, 0, 0, 0, 0, 1, 0, 2],
    fun: helper.priceText
  },
  available: {
    path: ["ds:5", 1, 2, 18, 0],
    fun: Boolean
  },
  offersIAP: {
    path: ["ds:5", 1, 2, 19, 0],
    fun: Boolean
  },
  IAPRange: ["ds:5", 1, 2, 19, 0],
  androidVersion: {
    path: ["ds:5", 1, 2, 140, 1, 1, 0, 0, 1],
    fun: helper.normalizeAndroidVersion
  },
  androidVersionText: {
    path: ["ds:5", 1, 2, 140, 1, 1, 0, 0, 1],
    fun: (version) => version || "Varies with device"
  },
  androidMaxVersion: {
    path: ["ds:5", 1, 2, 140, 1, 1, 0, 1, 1],
    fun: helper.normalizeAndroidVersion
  },
  developer: ["ds:5", 1, 2, 68, 0],
  developerId: {
    path: ["ds:5", 1, 2, 68, 1, 4, 2],
    fun: (devUrl) => devUrl.split("id=")[1]
  },
  developerEmail: ["ds:5", 1, 2, 69, 1, 0],
  developerWebsite: ["ds:5", 1, 2, 69, 0, 5, 2],
  developerAddress: ["ds:5", 1, 2, 69, 2, 0],
  privacyPolicy: ["ds:5", 1, 2, 99, 0, 5, 2],
  developerInternalID: {
    path: ["ds:5", 1, 2, 68, 1, 4, 2],
    fun: (devUrl) => devUrl.split("id=")[1]
  },
  genre: ["ds:5", 1, 2, 79, 0, 0, 0],
  genreId: ["ds:5", 1, 2, 79, 0, 0, 2],
  categories: {
    path: ["ds:5", 1, 2],
    fun: (searchArray) => {
      const categories = helper.extractCategories(R$4.path([118], searchArray));
      if (categories.length === 0) {
        categories.push({
          name: R$4.path([79, 0, 0, 0], searchArray),
          id: R$4.path([79, 0, 0, 2], searchArray)
        });
      }
      return categories;
    }
  },
  icon: ["ds:5", 1, 2, 95, 0, 3, 2],
  headerImage: ["ds:5", 1, 2, 96, 0, 3, 2],
  screenshots: {
    path: ["ds:5", 1, 2, 78, 0],
    fun: (screenshots) => {
      if (screenshots === null) return [];
      return screenshots.map(R$4.path([3, 2]));
    }
  },
  video: ["ds:5", 1, 2, 100, 0, 0, 3, 2],
  videoImage: ["ds:5", 1, 2, 100, 1, 0, 3, 2],
  previewVideo: ["ds:5", 1, 2, 100, 1, 2, 0, 2],
  contentRating: ["ds:5", 1, 2, 9, 0],
  contentRatingDescription: ["ds:5", 1, 2, 9, 2, 1],
  adSupported: {
    path: ["ds:5", 1, 2, 48],
    fun: Boolean
  },
  released: ["ds:5", 1, 2, 10, 0],
  updated: {
    path: ["ds:5", 1, 2, 145, 0, 1, 0],
    fun: (ts) => ts * 1e3
  },
  version: {
    path: ["ds:5", 1, 2, 140, 0, 0, 0],
    fun: (val) => val || "VARY"
  },
  recentChanges: ["ds:5", 1, 2, 144, 1, 1],
  comments: {
    path: ["ds:8", 0],
    isArray: true,
    fun: helper.extractComments
  },
  preregister: {
    path: ["ds:5", 1, 2, 18, 0],
    fun: (val) => val === 1
  },
  earlyAccessEnabled: {
    path: ["ds:5", 1, 2, 18, 2],
    fun: (val) => typeof val === "string"
  },
  isAvailableInPlayPass: {
    path: ["ds:5", 1, 2, 62],
    fun: (field) => !!field
  }
};

const MAPPINGS$2 = {
  title: [2],
  appId: [12, 0],
  url: {
    path: [9, 4, 2],
    fun: (path) => new url.URL(path, BASE_URL).toString()
  },
  icon: [1, 1, 0, 3, 2],
  developer: [4, 0, 0, 0],
  developerId: {
    path: [4, 0, 0, 1, 4, 2],
    fun: extaractDeveloperId$1
  },
  priceText: {
    path: [7, 0, 3, 2, 1, 0, 2],
    fun: (price) => price === void 0 ? "FREE" : price
  },
  currency: [7, 0, 3, 2, 1, 0, 1],
  price: {
    path: [7, 0, 3, 2, 1, 0, 2],
    fun: (price) => price === void 0 ? 0 : parseFloat(price.match(/([0-9.,]+)/)[0])
  },
  free: {
    path: [7, 0, 3, 2, 1, 0, 2],
    fun: (price) => price === void 0
  },
  summary: [4, 1, 1, 1, 1],
  scoreText: [6, 0, 2, 1, 0],
  score: [6, 0, 2, 1, 1]
};
function extaractDeveloperId$1(link) {
  return link.split("?id=")[1];
}
function extract$1(root, data) {
  const input = R$4.path(root, data);
  if (input === void 0) return [];
  return R$4.map(scriptData.extractor(MAPPINGS$2), input);
}
const appList = { MAPPINGS: MAPPINGS$2, extract: extract$1 };

const debug$5 = debug$8("google-play-scraper:processPages");
async function processPages(html, opts, savedApps, mappings) {
  if (R$4.is(String, html)) {
    html = scriptData.parse(html);
  }
  const processedApps = appList.extract(mappings.apps, html);
  const apps = opts.fullDetail ? await processFullDetailApps(processedApps, opts) : processedApps;
  const token = R$4.path(mappings.token, html);
  return checkFinished(opts, [...savedApps, ...apps], token);
}
async function processFullDetailApps(apps, opts) {
  const promises = apps.map((app$1) => app({
    appId: app$1.appId,
    lang: opts.lang,
    country: opts.country,
    cache: opts.cache,
    throttle: opts.throttle,
    requestOptions: opts.requestOptions
  }));
  return Promise.all(promises);
}
const REQUEST_MAPPINGS$1 = {
  apps: [0, 0, 0],
  token: [0, 0, 7, 1]
};
function checkFinished(opts, savedApps, nextToken) {
  if (savedApps.length >= opts.num || !nextToken) {
    return savedApps.slice(0, opts.num);
  }
  const body = getBodyForRequests$2({
    numberOfApps: opts.numberOfApps,
    withToken: nextToken
  });
  const url = `${BASE_URL}/_/PlayStoreUi/data/batchexecute?rpcids=qnKhOb&f.sid=-697906427155521722&bl=boq_playuiserver_20190903.08_p0&hl=${opts.lang}&gl=${opts.country}&authuser&soc-app=121&soc-platform=1&soc-device=1&_reqid=1065213`;
  debug$5("batchexecute URL: %s", url);
  debug$5("with body: %s", body);
  const requestOptions = Object.assign({
    url,
    method: "POST",
    body,
    followRedirect: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  }, opts.requestOptions);
  return request(requestOptions, opts.throttle).then((html) => {
    const input = JSON.parse(html.substring(5));
    const data = JSON.parse(input[0][2]);
    return data === null ? savedApps : processPages(data, opts, savedApps, REQUEST_MAPPINGS$1);
  });
}
function getBodyForRequests$2({
  numberOfApps = 100,
  withToken = "%token%"
}) {
  const body = `f.req=%5B%5B%5B%22qnKhOb%22%2C%22%5B%5Bnull%2C%5B%5B10%2C%5B10%2C${numberOfApps}%5D%5D%2Ctrue%2Cnull%2C%5B96%2C27%2C4%2C8%2C57%2C30%2C110%2C79%2C11%2C16%2C49%2C1%2C3%2C9%2C12%2C104%2C55%2C56%2C51%2C10%2C34%2C77%5D%5D%2Cnull%2C%5C%22${withToken}%5C%22%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D`;
  return body;
}

const debug$4 = debug$8("google-play-scraper:list");
function getBodyForRequests$1(payloadOpts) {
  const { num, collection, category } = payloadOpts;
  const body = `f.req=%5B%5B%5B%22vyAe2%22%2C%22%5B%5Bnull%2C%5B%5B8%2C%5B20%2C${num}%5D%5D%2Ctrue%2Cnull%2C%5B64%2C1%2C195%2C71%2C8%2C72%2C9%2C10%2C11%2C139%2C12%2C16%2C145%2C148%2C150%2C151%2C152%2C27%2C30%2C31%2C96%2C32%2C34%2C163%2C100%2C165%2C104%2C169%2C108%2C110%2C113%2C55%2C56%2C57%2C122%5D%2C%5Bnull%2Cnull%2C%5B%5B%5Btrue%5D%2Cnull%2C%5B%5Bnull%2C%5B%5D%5D%5D%2Cnull%2Cnull%2Cnull%2Cnull%2C%5Bnull%2C2%5D%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B1%5D%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B1%5D%5D%2C%5Bnull%2C%5B%5Bnull%2C%5B%5D%5D%5D%5D%2C%5Bnull%2C%5B%5Bnull%2C%5B%5D%5D%5D%2Cnull%2C%5Btrue%5D%5D%2C%5Bnull%2C%5B%5Bnull%2C%5B%5D%5D%5D%5D%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5B%5Bnull%2C%5B%5D%5D%5D%5D%2C%5B%5B%5Bnull%2C%5B%5D%5D%5D%5D%5D%2C%5B%5B%5B%5B7%2C1%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C31%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C104%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C9%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C8%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C27%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C12%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C65%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C110%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C88%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C11%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C56%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C55%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C96%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C10%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C122%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C72%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C71%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C64%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C113%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C139%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C150%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C169%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C165%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C151%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C163%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C32%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C16%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C108%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B7%2C100%5D%2C%5B%5B1%2C73%2C96%2C103%2C97%2C58%2C50%2C92%2C52%2C112%2C69%2C19%2C31%2C101%2C123%2C74%2C49%2C80%2C38%2C20%2C10%2C14%2C79%2C43%2C42%2C139%5D%5D%5D%2C%5B%5B9%2C1%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C31%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C104%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C9%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C8%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C27%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C12%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C65%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C110%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C88%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C11%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C56%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C55%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C96%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C10%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C122%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C72%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C71%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C64%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C113%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C139%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C150%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C169%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C165%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C151%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C163%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C32%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C16%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C108%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B9%2C100%5D%2C%5B%5B1%2C7%2C9%2C24%2C12%2C31%2C5%2C15%2C27%2C8%2C13%2C10%5D%5D%5D%2C%5B%5B17%2C1%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C31%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C104%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C9%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C8%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C27%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C12%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C65%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C110%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C88%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C11%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C56%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C55%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C96%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C10%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C122%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C72%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C71%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C64%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C113%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C139%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C150%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C169%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C165%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C151%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C163%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C32%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C16%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C108%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B17%2C100%5D%2C%5B%5B1%2C7%2C9%2C25%2C13%2C31%2C5%2C41%2C27%2C8%2C14%2C10%5D%5D%5D%2C%5B%5B10%2C1%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C31%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C104%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C9%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C8%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C27%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C12%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C65%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C110%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C88%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C11%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C56%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C55%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C96%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C10%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C122%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C72%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C71%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C64%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C113%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C139%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C150%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C169%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C165%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C151%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C163%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C32%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C16%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C108%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B10%2C100%5D%2C%5B%5B1%2C7%2C6%2C9%5D%5D%5D%2C%5B%5B1%2C1%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C31%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C104%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C9%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C8%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C27%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C12%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C65%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C110%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C88%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C11%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C56%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C55%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C96%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C10%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C122%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C72%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C71%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C64%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C113%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C139%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C150%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C169%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C165%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C151%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C163%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C32%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C16%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C108%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B1%2C100%5D%2C%5B%5B1%2C5%2C14%2C38%2C19%2C29%2C34%2C4%2C12%2C11%2C6%2C30%2C43%2C40%2C42%2C16%2C10%2C7%5D%5D%5D%2C%5B%5B4%2C1%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C31%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C104%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C9%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C8%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C27%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C12%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C65%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C110%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C88%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C11%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C56%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C55%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C96%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C10%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C122%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C72%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C71%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C64%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C113%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C139%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C150%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C169%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C165%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C151%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C163%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C32%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C16%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C108%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B4%2C100%5D%2C%5B%5B1%2C3%2C5%2C4%2C7%2C6%2C11%2C19%2C21%2C17%2C15%2C12%2C16%2C20%5D%5D%5D%2C%5B%5B3%2C1%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C31%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C104%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C9%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C8%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C27%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C12%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C65%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C110%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C88%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C11%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C56%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C55%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C96%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C10%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C122%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C72%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C71%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C64%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C113%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C139%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C150%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C169%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C165%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C151%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C163%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C32%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C16%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C108%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B3%2C100%5D%2C%5B%5B1%2C5%2C14%2C4%2C10%2C17%5D%5D%5D%2C%5B%5B2%2C1%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C31%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C104%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C9%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C8%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C27%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C12%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C65%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C110%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C88%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C11%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C56%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C55%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C96%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C10%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C122%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C72%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C71%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C64%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C113%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C139%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C150%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C169%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C165%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C151%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C163%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C32%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C16%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C108%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%2C%5B%5B2%2C100%5D%2C%5B%5B1%2C5%2C7%2C4%2C13%2C16%2C12%2C18%5D%5D%5D%5D%5D%5D%2Cnull%2Cnull%2C%5B%5B%5B1%2C2%5D%2C%5B10%2C8%2C9%5D%2C%5B%5D%2C%5B%5D%5D%5D%5D%2C%5B2%2C%5C%22${collection}%5C%22%2C%5C%22${category}%5C%22%5D%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D&at=AFSRYlx8XZfN8-O-IKASbNBDkB6T%3A1655531200971&`;
  return body;
}
function list(opts) {
  return new Promise(function(resolve, reject) {
    validate$1(opts);
    const fullListOpts = Object.assign({
      lang: "en",
      country: "us",
      num: 500
    }, opts);
    const body = getBodyForRequests$1({
      num: fullListOpts.num,
      collection: CLUSTER_NAMES[fullListOpts.collection],
      category: fullListOpts.category
    });
    const requestOptions = Object.assign({
      url: buildInitialUrl(fullListOpts),
      method: "POST",
      body,
      followRedirect: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }, opts.requestOptions);
    request(requestOptions, opts.throttle).then((html) => {
      const input = JSON.parse(html.split("\n")[3]);
      return JSON.parse(input[0][2]);
    }).then((collectionObject) => parseCollectionApps(collectionObject, opts)).then(resolve).catch(reject);
  });
}
function validate$1(opts) {
  opts.category = opts.category || constants.category.APPLICATION;
  if (opts.category && !R$4.includes(opts.category, R$4.values(constants.category))) {
    throw Error("Invalid category " + opts.category);
  }
  opts.collection = opts.collection || constants.collection.TOP_FREE;
  if (!R$4.includes(opts.collection, R$4.values(constants.collection))) {
    throw Error(`Invalid collection ${opts.collection}`);
  }
  if (opts.age && !R$4.includes(opts.age, R$4.values(constants.age))) {
    throw Error(`Invalid age range ${opts.age}`);
  }
}
function buildInitialUrl(opts) {
  const queryString = {
    hl: opts.lang,
    gl: opts.country
  };
  if (opts.age) {
    queryString.age = opts.age;
  }
  const url2 = `${BASE_URL}/_/PlayStoreUi/data/batchexecute?rpcids=vyAe2&source-path=%2Fstore%2Fapps&f.sid=-4178618388443751758&bl=boq_playuiserver_20220612.08_p0&authuser=0&soc-app=121&soc-platform=1&soc-device=1&_reqid=82003&rt=c`;
  const fullURL = `${url2}&${qs.stringify(queryString)}`;
  debug$4("Initial Request URL: %s", fullURL);
  return fullURL;
}
const CLUSTER_NAMES = {
  TOP_FREE: "topselling_free",
  TOP_PAID: "topselling_paid",
  GROSSING: "topgrossing"
};
async function parseCollectionApps(categoryObject, opts) {
  const appsMappings = {
    title: [0, 3],
    appId: [0, 0, 0],
    url: {
      path: [0, 10, 4, 2],
      fun: (path) => new url.URL(path, BASE_URL).toString()
    },
    icon: [0, 1, 3, 2],
    developer: [0, 14],
    currency: [0, 8, 1, 0, 1],
    price: {
      path: [0, 8, 1, 0, 0],
      fun: (price) => price / 1e6
    },
    free: {
      path: [0, 8, 1, 0, 0],
      fun: (price) => price === 0
    },
    summary: [0, 13, 1],
    scoreText: [0, 4, 0],
    score: [0, 4, 1]
  };
  const appsPath = [0, 1, 0, 28, 0];
  const processedApps = R$4.map(scriptData.extractor(appsMappings), R$4.path(appsPath, categoryObject));
  const apps = opts.fullDetail ? await processFullDetailApps(processedApps, opts) : processedApps;
  return apps;
}

function initialRequest(opts) {
  function skipClusterPage(html) {
    const match = html.match(/href="\/store\/apps\/collection\/search_collection_more_results_cluster?(.*?)"/);
    if (match) {
      const innerUrl = BASE_URL + match[0].split(/"/)[1];
      return request(Object.assign({
        url: innerUrl
      }, opts.requestOptions), opts.throttle);
    }
    return html;
  }
  const url2 = `${BASE_URL}/store/search?c=apps&q=${opts.term}&hl=${opts.lang}&gl=${opts.country}&price=${opts.price}`;
  return request(Object.assign({ url: url2 }, opts.requestOptions), opts.throttle).then(skipClusterPage).then((html) => processFirstPage$1(html, opts, [], INITIAL_MAPPINGS$1));
}
function extaractDeveloperId(link) {
  return link.split("?id=")[1];
}
async function processFirstPage$1(html, opts, savedApps, mappings) {
  if (R$4.is(String, html)) {
    html = scriptData.parse(html);
  }
  const mainAppMapping = {
    title: [16, 2, 0, 0],
    appId: [16, 11, 0, 0],
    url: {
      path: [17, 0, 0, 4, 2],
      fun: (path) => new url.URL(path, BASE_URL).toString()
    },
    icon: [16, 2, 95, 0, 3, 2],
    developer: [16, 2, 68, 0],
    developerId: {
      path: [16, 2, 68, 1, 4, 2],
      fun: extaractDeveloperId
    },
    currency: [17, 0, 2, 0, 1, 0, 1],
    price: {
      path: [17, 0, 2, 0, 1, 0, 0],
      fun: (price) => price / 1e6
    },
    free: {
      path: [17, 0, 2, 0, 1, 0, 0],
      fun: (price) => price === 0
    },
    summary: [16, 2, 73, 0, 1],
    scoreText: [16, 2, 51, 0, 0],
    score: [16, 2, 51, 0, 1]
  };
  const moreResultsMapping = {
    title: [0, 3],
    appId: [0, 0, 0],
    url: {
      path: [0, 10, 4, 2],
      fun: (path) => new url.URL(path, BASE_URL).toString()
    },
    icon: [0, 1, 3, 2],
    developer: [0, 14],
    currency: [0, 8, 1, 0, 1],
    price: {
      path: [0, 8, 1, 0, 0],
      fun: (price) => price / 1e6
    },
    free: {
      path: [0, 8, 1, 0, 0],
      fun: (price) => price === 0
    },
    summary: [0, 13, 1],
    scoreText: [0, 4, 0],
    score: [0, 4, 1]
  };
  removeUnneededSections(html, mappings);
  const sections = R$4.path(mappings.sections, html);
  if (noResultsFound(sections, opts)) return [];
  const moreResultsSection = sections.filter((section) => isMoreSection(section))[0];
  const mainAppSection = R$4.path(mappings.app, html);
  const processedApps = R$4.map(scriptData.extractor(moreResultsMapping), R$4.path(SECTIONS_MAPPING.apps, moreResultsSection));
  if (mainAppSection) {
    processedApps.unshift(scriptData.extractor(mainAppMapping)(mainAppSection));
  }
  const apps = opts.fullDetail ? await processFullDetailApps(processedApps, opts) : processedApps;
  const token = R$4.path(SECTIONS_MAPPING.token, moreResultsSection);
  return checkFinished(opts, [...savedApps, ...apps], token);
}
function isMoreSection(section) {
  const sectionTitle = R$4.path(SECTIONS_MAPPING.title, section);
  return R$4.is(String, sectionTitle);
}
function removeUnneededSections(html, mappings) {
  removeSectionsIfPathValueOfType(html, SECTIONS_MAPPING.aboutResultsTitle, String);
  removeSectionsIfPathValueOfType(html, [...mappings.sections, 0, ...SECTIONS_MAPPING.suggestedResultDescritpion], String);
  removeSectionsIfPathValueOfType(html, SECTIONS_MAPPING.aboutResultsTitle, String);
}
function removeSectionsIfPathValueOfType(html, path, type) {
  if (R$4.is(type, R$4.path(path, html))) {
    R$4.path(INITIAL_MAPPINGS$1.sections, html).shift();
  }
}
function noResultsFound(sections, opts) {
  return sections.some((section) => {
    const noResults = R$4.path(SECTIONS_MAPPING.noResults, section);
    return R$4.is(String, noResults) && noResults.endsWith(`<b>${opts.term}</b>`);
  });
}
const INITIAL_MAPPINGS$1 = {
  app: ["ds:4", 0, 1, 0, 23],
  sections: ["ds:4", 0, 1]
};
const SECTIONS_MAPPING = {
  title: [22, 1, 0],
  token: [22, 1, 3, 1],
  apps: [22, 0],
  noResults: [25, 0, 0, 0, 1],
  suggestedResultDescritpion: [25, 0, 0, 1, 1],
  aboutResultsTitle: ["ds:4", 0, 1, 0, 31, 0]
};
function getPriceGoogleValue(value) {
  switch (value.toLowerCase()) {
    case "free":
      return 1;
    case "paid":
      return 2;
    case "all":
    default:
      return 0;
  }
}
function search(appData, opts) {
  return new Promise(function(resolve, reject) {
    if (!opts || !opts.term) {
      throw Error("Search term missing");
    }
    if (opts.num && opts.num > 250) {
      throw Error("The number of results can't exceed 250");
    }
    opts = {
      term: encodeURIComponent(opts.term),
      lang: opts.lang || "en",
      country: opts.country || "us",
      num: opts.num || 20,
      fullDetail: opts.fullDetail,
      price: opts.price ? getPriceGoogleValue(opts.price) : 0,
      throttle: opts.throttle,
      cache: opts.cache,
      requestOptions: opts.requestOptions
    };
    initialRequest(opts).then(resolve).catch(reject);
  }).then((results) => {
    if (opts.fullDetail) {
      return Promise.all(results.map((app) => appData({ ...opts, appId: app.appId })));
    }
    return results;
  });
}

function suggest(opts) {
  return new Promise(function(resolve, reject) {
    if (!opts && !opts.term) {
      throw Error("term missing");
    }
    const lang = opts.lang || "en";
    const country = opts.country || "us";
    const url = `${BASE_URL}/_/PlayStoreUi/data/batchexecute?rpcids=IJ4APc&f.sid=-697906427155521722&bl=boq_playuiserver_20190903.08_p0&hl=${lang}&gl=${country}&authuser&soc-app=121&soc-platform=1&soc-device=1&_reqid=1065213`;
    const term = encodeURIComponent(opts.term);
    const body = `f.req=%5B%5B%5B%22IJ4APc%22%2C%22%5B%5Bnull%2C%5B%5C%22${term}%5C%22%5D%2C%5B10%5D%2C%5B2%5D%2C4%5D%5D%22%5D%5D%5D`;
    const options = Object.assign({
      url,
      body,
      method: "POST",
      followAllRedirects: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }, opts.requestOptions);
    request(options, opts.throttle).then((html) => {
      const input = JSON.parse(html.substring(5));
      const data = JSON.parse(input[0][2]);
      if (data === null) {
        return [];
      }
      return data[0][0].map((s) => s[0]);
    }).then(resolve).catch(reject);
  });
}

const debug$3 = debug$8("google-play-scraper:developer");
function buildUrl(opts) {
  const { lang, devId, country } = opts;
  const url2 = `${BASE_URL}/store/apps`;
  const path = isNaN(opts.devId) ? "/developer" : "/dev";
  const queryString = {
    id: devId,
    hl: lang,
    gl: country
  };
  const fullURL = `${url2}${path}?${qs.stringify(queryString)}`;
  debug$3("Initial request: %s", fullURL);
  return fullURL;
}
function developer(opts) {
  return new Promise(function(resolve, reject) {
    if (!opts.devId) {
      throw Error("devId missing");
    }
    opts = Object.assign({
      num: 60,
      lang: "en",
      country: "us"
    }, opts);
    const options = Object.assign({
      url: buildUrl(opts),
      method: "GET",
      followRedirect: true
    }, opts.requestOptions);
    request(options, opts.throttle).then(scriptData.parse).then((parsedObject) => parseDeveloperApps(parsedObject, opts)).then(resolve).catch(reject);
  });
}
async function parseDeveloperApps(html, opts) {
  if (R$4.is(String, html)) {
    html = scriptData.parse(html);
  }
  const initialMappings = isNaN(opts.devId) ? {
    apps: ["ds:3", 0, 1, 0, 22, 0],
    token: ["ds:3", 0, 1, 0, 22, 1, 3, 1]
  } : {
    apps: ["ds:3", 0, 1, 0, 21, 0],
    token: ["ds:3", 0, 1, 0, 21, 1, 3, 1]
  };
  const appsMappings = isNaN(opts.devId) ? {
    title: [0, 3],
    appId: [0, 0, 0],
    url: {
      path: [0, 10, 4, 2],
      fun: (path) => new url.URL(path, BASE_URL).toString()
    },
    icon: [0, 1, 3, 2],
    developer: [0, 14],
    currency: [0, 8, 1, 0, 1],
    price: {
      path: [0, 8, 1, 0, 0],
      fun: (price) => price / 1e6
    },
    free: {
      path: [0, 8, 1, 0, 0],
      fun: (price) => price === 0
    },
    summary: [0, 13, 1],
    scoreText: [0, 4, 0],
    score: [0, 4, 1]
  } : {
    title: [3],
    appId: [0, 0],
    url: {
      path: [10, 4, 2],
      fun: (path) => new url.URL(path, BASE_URL).toString()
    },
    icon: [1, 3, 2],
    developer: [14],
    currency: [8, 1, 0, 1],
    price: {
      path: [8, 1, 0, 0],
      fun: (price) => price / 1e6
    },
    free: {
      path: [8, 1, 0, 0],
      fun: (price) => price === 0
    },
    summary: [13, 1],
    scoreText: [4, 0],
    score: [4, 1]
  };
  const processedApps = R$4.map(scriptData.extractor(appsMappings), R$4.path(initialMappings.apps, html));
  const apps = opts.fullDetail ? await processFullDetailApps(processedApps, opts) : processedApps;
  const token = R$4.path(initialMappings.token, html);
  return checkFinished(opts, apps, token);
}

const debug$2 = debug$8("google-play-scraper:reviews");
function reviews(opts) {
  return new Promise(function(resolve, reject) {
    validate(opts);
    const fullOptions = Object.assign({
      sort: constants.sort.NEWEST,
      lang: "en",
      country: "us",
      num: 150,
      paginate: false,
      nextPaginationToken: null
    }, opts);
    processReviews(fullOptions).then(resolve).catch(reject);
  });
}
function validate(opts) {
  if (!opts || !opts.appId) {
    throw Error("appId missing");
  }
  if (opts.sort && !R$4.includes(opts.sort, R$4.values(constants.sort))) {
    throw new Error("Invalid sort " + opts.sort);
  }
}
function formatReviewsResponse({
  reviews: reviews2,
  num,
  token = null
}) {
  const reviewsToResponse = reviews2.length >= num ? reviews2.slice(0, num) : reviews2;
  return {
    data: reviewsToResponse,
    nextPaginationToken: token
  };
}
const REQUEST_TYPE = {
  initial: "initial",
  paginated: "paginated"
};
function getBodyForRequests({
  appId,
  sort,
  numberOfReviewsPerRequest = 150,
  withToken = "%token%",
  requestType = REQUEST_TYPE.initial
}) {
  const formBody = {
    [REQUEST_TYPE.initial]: `f.req=%5B%5B%5B%22UsvDTd%22%2C%22%5Bnull%2Cnull%2C%5B2%2C${sort}%2C%5B${numberOfReviewsPerRequest}%2Cnull%2Cnull%5D%2Cnull%2C%5B%5D%5D%2C%5B%5C%22${appId}%5C%22%2C7%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D`,
    [REQUEST_TYPE.paginated]: `f.req=%5B%5B%5B%22UsvDTd%22%2C%22%5Bnull%2Cnull%2C%5B2%2C${sort}%2C%5B${numberOfReviewsPerRequest}%2Cnull%2C%5C%22${withToken}%5C%22%5D%2Cnull%2C%5B%5D%5D%2C%5B%5C%22${appId}%5C%22%2C7%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D`
  };
  return formBody[requestType];
}
const REQUEST_MAPPINGS = {
  reviews: [0],
  token: [1, 1]
};
async function processReviewsAndGetNextPage(html, opts, savedReviews) {
  const processAndRecurOptions = Object.assign({}, opts, { requestType: REQUEST_TYPE.paginated });
  const { appId, paginate, num } = processAndRecurOptions;
  const parsedHtml = R$4.is(String, html) ? scriptData.parse(html) : html;
  if (parsedHtml.length === 0) {
    return formatReviewsResponse({ reviews: savedReviews, token: null, num });
  }
  const reviews2 = extract(REQUEST_MAPPINGS.reviews, parsedHtml, appId);
  const token = R$4.path(REQUEST_MAPPINGS.token, parsedHtml);
  const reviewsAccumulator = [...savedReviews, ...reviews2];
  return !paginate && token && reviewsAccumulator.length < num ? makeReviewsRequest(processAndRecurOptions, reviewsAccumulator, token) : formatReviewsResponse({ reviews: reviewsAccumulator, token, num });
}
function makeReviewsRequest(opts, savedReviews, nextToken) {
  debug$2("nextToken: %s", nextToken);
  debug$2("savedReviews length: %s", savedReviews.length);
  debug$2("requestType: %s", opts.requestType);
  const {
    appId,
    sort,
    requestType,
    lang,
    country,
    requestOptions,
    throttle,
    num
  } = opts;
  const body = getBodyForRequests({
    appId,
    sort,
    withToken: nextToken,
    requestType
  });
  const url = `${BASE_URL}/_/PlayStoreUi/data/batchexecute?rpcids=qnKhOb&f.sid=-697906427155521722&bl=boq_playuiserver_20190903.08_p0&hl=${lang}&gl=${country}&authuser&soc-app=121&soc-platform=1&soc-device=1&_reqid=1065213`;
  debug$2("batchexecute URL: %s", url);
  debug$2("with body: %s", body);
  const reviewRequestOptions = Object.assign({
    url,
    method: "POST",
    body,
    followRedirect: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  }, requestOptions);
  return request(reviewRequestOptions, throttle).then((html) => {
    const input = JSON.parse(html.substring(5));
    const data = JSON.parse(input[0][2]);
    return data === null ? formatReviewsResponse({ reviews: savedReviews, token: null, num }) : processReviewsAndGetNextPage(data, opts, savedReviews);
  });
}
function processReviews(opts) {
  const requestType = !opts.nextPaginationToken ? REQUEST_TYPE.initial : REQUEST_TYPE.paginated;
  const token = opts.nextPaginationToken || "%token%";
  const reviewsOptions = Object.assign({}, { requestType }, opts);
  return makeReviewsRequest(reviewsOptions, [], token);
}
function getReviewsMappings(appId) {
  const MAPPINGS = {
    id: [0],
    userName: [1, 0],
    userImage: [1, 1, 3, 2],
    date: {
      path: [5],
      fun: generateDate
    },
    score: [2],
    scoreText: {
      path: [2],
      fun: (score) => String(score)
    },
    url: {
      path: [0],
      fun: (reviewId) => `${BASE_URL}/store/apps/details?id=${appId}&reviewId=${reviewId}`
    },
    title: {
      path: [0],
      fun: () => null
    },
    text: [4],
    replyDate: {
      path: [7, 2],
      fun: generateDate
    },
    replyText: {
      path: [7, 1],
      fun: (text) => text || null
    },
    version: {
      path: [10],
      fun: (version) => version || null
    },
    thumbsUp: [6],
    criterias: {
      path: [12, 0],
      fun: (criterias = []) => criterias.map(buildCriteria)
    }
  };
  return MAPPINGS;
}
const buildCriteria = (criteria) => ({
  criteria: criteria[0],
  rating: criteria[1] ? criteria[1][0] : null
});
function generateDate(dateArray) {
  if (!dateArray) {
    return null;
  }
  const millisecondsLastDigits = String(dateArray[1] || "000");
  const millisecondsTotal = `${dateArray[0]}${millisecondsLastDigits.substring(0, 3)}`;
  const date = new Date(Number(millisecondsTotal));
  return date.toJSON();
}
function extract(root, data, appId) {
  const input = R$4.path(root, data);
  const MAPPINGS = getReviewsMappings(appId);
  return R$4.map(scriptData.extractor(MAPPINGS), input);
}

const debug$1 = debug$8("google-play-scraper:similar");
function similar(opts) {
  return new Promise(function(resolve, reject) {
    validateSimilarParameters(opts);
    const mergedOpts = Object.assign(
      {},
      {
        appId: encodeURIComponent(opts.appId),
        lang: opts.lang || "en",
        country: opts.country || "us",
        fullDetail: opts.fullDetail
      }
    );
    const qs$1 = qs.stringify({
      id: mergedOpts.appId,
      hl: "en",
      gl: mergedOpts.country
    });
    const similarUrl = `${BASE_URL}/store/apps/details?${qs$1}`;
    const options = Object.assign({
      url: similarUrl,
      followRedirect: true
    }, opts.requestOptions);
    debug$1("Similar Request URL: %s", similarUrl);
    request(options, opts.throttle).then(scriptData.parse).then((parsedObject) => parseSimilarApps(parsedObject, mergedOpts)).then(resolve).catch(reject);
  });
}
function validateSimilarParameters(opts) {
  if (!opts || !opts.appId) {
    throw Error("appId missing");
  }
}
const INITIAL_MAPPINGS = {
  clusters: {
    path: [1, 1],
    useServiceRequestId: "ag2B9c"
  },
  apps: ["ds:3", 0, 1, 0, 21, 0],
  token: ["ds:3", 0, 1, 0, 21, 1, 3, 1]
};
const CLUSTER_MAPPING = {
  title: [21, 1, 0],
  url: [21, 1, 2, 4, 2]
};
const SIMILAR_APPS = "Similar apps";
const SIMILAR_GAMES = "Similar games";
function parseSimilarApps(similarObject, opts) {
  const clusters = scriptData.extractDataWithServiceRequestId(similarObject, INITIAL_MAPPINGS.clusters);
  if (clusters.length === 0) {
    throw Error("Similar apps not found");
  }
  let similarAppsCluster = clusters.filter((cluster) => {
    return R$4.path(CLUSTER_MAPPING.title, cluster) === SIMILAR_APPS || R$4.path(CLUSTER_MAPPING.title, cluster) === SIMILAR_GAMES || clusters;
  });
  if (similarAppsCluster.length === 0) {
    similarAppsCluster = clusters;
  }
  const clusterUrl = getParsedCluster(similarAppsCluster[0]);
  const fullClusterUrl = `${BASE_URL}${clusterUrl}&gl=${opts.country}&hl=${opts.lang}`;
  debug$1("Cluster Request URL: %s", fullClusterUrl);
  const options = Object.assign({
    url: fullClusterUrl,
    followRedirect: true
  }, opts.requestOptions);
  return request(options, opts.throttle).then(scriptData.parse).then((htmlParsed) => processFirstPage(htmlParsed, opts, [], INITIAL_MAPPINGS));
}
async function processFirstPage(html, opts, savedApps, mappings) {
  if (R$4.is(String, html)) {
    html = scriptData.parse(html);
  }
  const mapping = {
    title: [3],
    appId: [0, 0],
    url: {
      path: [10, 4, 2],
      fun: (path) => new url.URL(path, BASE_URL).toString()
    },
    icon: [1, 3, 2],
    developer: [14],
    currency: [8, 1, 0, 1],
    price: {
      path: [8, 1, 0, 0],
      fun: (price) => price / 1e6
    },
    free: {
      path: [8, 1, 0, 0],
      fun: (price) => price === 0
    },
    summary: [13, 1],
    scoreText: [4, 0],
    score: [4, 1]
  };
  const processedApps = R$4.map(scriptData.extractor(mapping), R$4.path(mappings.apps, html));
  const apps = opts.fullDetail ? await processFullDetailApps(processedApps, opts) : processedApps;
  const token = R$4.path(mappings.token, html);
  return checkFinished(opts, [...savedApps, ...apps], token);
}
function getParsedCluster(similarObject) {
  const clusterUrl = R$4.path(CLUSTER_MAPPING.url, similarObject);
  return clusterUrl;
}

const debug = debug$8("google-play-scraper:permissions");
function permissions(opts) {
  return new Promise(function(resolve, reject) {
    if (!opts && !opts.appId) {
      throw Error("appId missing");
    }
    opts.lang = opts.lang || "en";
    processPermissions(opts).then(resolve).catch(reject);
  });
}
function processPermissions(opts) {
  const body = `f.req=%5B%5B%5B%22xdSrCf%22%2C%22%5B%5Bnull%2C%5B%5C%22${opts.appId}%5C%22%2C7%5D%2C%5B%5D%5D%5D%22%2Cnull%2C%221%22%5D%5D%5D`;
  const url = `${BASE_URL}/_/PlayStoreUi/data/batchexecute?rpcids=qnKhOb&f.sid=-697906427155521722&bl=boq_playuiserver_20190903.08_p0&hl=${opts.lang}&authuser&soc-app=121&soc-platform=1&soc-device=1&_reqid=1065213`;
  debug("batchexecute URL: %s", url);
  debug("with body: %s", body);
  const requestOptions = Object.assign({
    url,
    method: "POST",
    body,
    followRedirect: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  }, opts.requestOptions);
  return request(requestOptions, opts.throttle).then((html) => {
    const input = JSON.parse(html.substring(5));
    const data = JSON.parse(input[0][2]);
    if (data === null) {
      return [];
    }
    return opts.short ? processShortPermissionsData(data) : processPermissionData(data);
  });
}
const MAPPINGS$1 = {
  permissions: [2],
  type: 0
};
function processShortPermissionsData(html) {
  if (R$4.is(String, html)) {
    html = scriptData.parse(html);
  }
  const commonPermissions = html[constants.permission.COMMON];
  if (!commonPermissions) {
    return [];
  }
  const validPermissions = commonPermissions.filter((permission) => permission.length);
  const permissionNames = R$4.chain((permission) => permission[MAPPINGS$1.type], validPermissions);
  return permissionNames;
}
function processPermissionData(html) {
  if (R$4.is(String, html)) {
    html = scriptData.parse(html);
  }
  debug("html %o", html);
  const permissions2 = Object.values(constants.permission).reduce((permissionAccummulator, permission) => {
    if (!html[permission]) {
      return permissionAccummulator;
    }
    permissionAccummulator.push(
      ...R$4.chain(flatMapPermissions, html[permission])
    );
    return permissionAccummulator;
  }, []);
  debug("Permissions %o", permissions2);
  return permissions2;
}
function flatMapPermissions(permission) {
  const input = R$4.path(MAPPINGS$1.permissions, permission);
  if (typeof input === "undefined") {
    return [];
  }
  const mappings = getPermissionMappings(permission[MAPPINGS$1.type]);
  return R$4.map(scriptData.extractor(mappings), input);
}
function getPermissionMappings(type) {
  return {
    permission: [1],
    type: {
      path: 0,
      fun: () => type
    }
  };
}

function dataSafety(opts) {
  return new Promise(function(resolve, reject) {
    if (!opts && !opts.appId) {
      throw Error("appId missing");
    }
    opts.lang = opts.lang || "en";
    processDataSafety(opts).then(resolve).catch(reject);
  });
}
function processDataSafety(opts) {
  const PLAYSTORE_URL = `${BASE_URL}/store/apps/datasafety`;
  const searchParams = new URLSearchParams({
    id: opts.appId,
    hl: opts.lang
  });
  const reqUrl = `${PLAYSTORE_URL}?${searchParams}`;
  const options = Object.assign({
    url: reqUrl,
    followRedirect: true
  }, opts.requestOptions);
  return request(options, opts.throttle).then(scriptData.parse).then(scriptData.extractor(MAPPINGS));
}
const MAPPINGS = {
  sharedData: {
    path: ["ds:3", 1, 2, 137, 4, 0, 0],
    fun: mapDataEntries
  },
  collectedData: {
    path: ["ds:3", 1, 2, 137, 4, 1, 0],
    fun: mapDataEntries
  },
  securityPractices: {
    path: ["ds:3", 1, 2, 137, 9, 2],
    fun: mapSecurityPractices
  },
  privacyPolicyUrl: ["ds:3", 1, 2, 99, 0, 5, 2]
};
function mapSecurityPractices(practices) {
  if (!practices) {
    return [];
  }
  return practices.map((practice) => ({
    practice: R$4.path([1], practice),
    description: R$4.path([2, 1], practice)
  }));
}
function mapDataEntries(dataEntries) {
  if (!dataEntries) {
    return [];
  }
  return dataEntries.flatMap((data) => {
    const type = R$4.path([0, 1], data);
    const details = R$4.path([4], data);
    return details.map((detail) => ({
      data: R$4.path([0], detail),
      optional: R$4.path([1], detail),
      purpose: R$4.path([2], detail),
      type
    }));
  });
}

const PLAYSTORE_URL = `${BASE_URL}/store/apps`;
const CATEGORY_URL_PREFIX = "/store/apps/category/";
function categories(opts) {
  opts = Object.assign({}, opts);
  return new Promise(function(resolve, reject) {
    const options = Object.assign(
      {
        url: PLAYSTORE_URL
      },
      opts.requestOptions
    );
    request(options, opts.throttle).then(cheerio$1.load).then(extractCategories).then(resolve).catch(reject);
  });
}
function extractCategories($) {
  const categoryIds = $("ul li a").toArray().map((el) => $(el).attr("href")).filter((url) => url.startsWith(CATEGORY_URL_PREFIX) && !url.includes("?age=")).map((url) => url.substr(CATEGORY_URL_PREFIX.length));
  categoryIds.push("APPLICATION");
  return categoryIds;
}

const methods = {
  app: app,
  list,
  search: R$4.partial(search, [app]),
  suggest,
  developer,
  reviews,
  similar,
  permissions,
  datasafety: dataSafety,
  categories
};
function memoized(opts) {
  const cacheOpts = Object.assign({
    primitive: true,
    normalizer: JSON.stringify,
    maxAge: 1e3 * 60 * 5,
    // cache for 5 minutes
    max: 1e3
    // save up to 1k results to avoid memory issues
  }, opts);
  const doMemoize = (fn) => memoizee__default(fn, cacheOpts);
  const mAppMethod = memoizee__default(app, cacheOpts);
  const otherMethods = {
    list,
    search: R$4.partial(search, [mAppMethod]),
    suggest,
    developer,
    reviews,
    similar,
    permissions,
    datasafety: dataSafety,
    categories
  };
  return Object.assign(
    { app: mAppMethod },
    constants,
    R$4.map(doMemoize, otherMethods)
  );
}
const gplay = Object.assign({ memoized }, constants, methods);

export { gplay as g, store as s };
//# sourceMappingURL=index.mjs.map
