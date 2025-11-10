'use strict';

const request = require('request');
const throttled = require('throttled-request')(request);
const debug = require('debug')('app-store-scraper');
const c = require('./constants');

const { getProxyAgentByIndex, getProxyCount } = require('../../proxyManager.js');



function cleanApp (app) {
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

const doRequest = (url, headers, requestOptions, limit) => {
  const attemptRequest = (agent) => new Promise(function (resolve, reject) {
    debug('Making request: %s %j %o', url, headers, requestOptions);
    requestOptions = Object.assign({ method: 'GET' }, requestOptions);

    let req = request;
    if (limit) {
      throttled.configure({
        requests: limit,
        milliseconds: 1000
      });
      req = throttled;
    }

    const options = Object.assign({ 
      url, 
      headers, 
      agent: agent
    }, requestOptions);

    req(options, (error, response, body) => {
      if (error) {
        debug('Request error', error);
        return reject(error);
      }
      if (response.statusCode >= 400) {
        return reject({ response });
      }
      debug('Finished request');
      resolve(body);
    });
  });

  // Promise bọc vòng lặp retry
  return new Promise(async (resolve, reject) => {
    let lastError;

    const totalAttempts = getProxyCount() > 0 ? getProxyCount() : 1;

    for (let attemptIndex = 0; attemptIndex <= totalAttempts; attemptIndex++) {
      let agent = undefined;
      if(attemptIndex) {
        agent = getProxyAgentByIndex(attemptIndex);
      }

      try {
        console.log(`Request attempt ${attemptIndex}/${totalAttempts}...`);
        const body = await attemptRequest(agent);
        return resolve(body);
      } catch (error) {
        console.log(`Request error (attempt ${attemptIndex}/${totalAttempts}):`, error.message || error.response?.statusCode);
        lastError = error;
      }
    }
    
    // Nếu thử hết proxy mà vẫn fail
    console.log(`Request failed after ${totalAttempts} attempts.`);
    reject(lastError); // Ném lỗi cuối cùng
  });
};


const LOOKUP_URL = 'https://itunes.apple.com/lookup';

function lookup (ids, idField, country, lang, requestOptions, limit) {
  idField = idField || 'id';
  country = country || 'us';
  const langParam = lang ? `&lang=${lang}` : '';
  const joinedIds = ids.join(',');
  const url = `${LOOKUP_URL}?${idField}=${joinedIds}&country=${country}&entity=software${langParam}`;
  return doRequest(url, {}, requestOptions, limit)
    .then(JSON.parse)
    .then((res) => res.results.filter(function (app) {
      return typeof app.wrapperType === 'undefined' || app.wrapperType === 'software';
    }))
    .then((res) => res.map(cleanApp));
}

function storeId (countryCode) {
  const markets = c.markets;
  const defaultStore = '143441';
  return (countryCode && markets[countryCode.toUpperCase()]) || defaultStore;
}

module.exports = { cleanApp, lookup, request: doRequest, storeId };
