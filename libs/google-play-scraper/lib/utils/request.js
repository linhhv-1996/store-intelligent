import requestLib from 'got';
import throttled from './throttle.js';
import createDebug from 'debug';

import { getProxyAgentByIndex, getProxyCount } from '@libs/proxyManager.js';


const debug = createDebug('google-play-scraper');

function doRequest (opts, limit) {
  let req;
  if (limit) {
    req = throttled(
      requestLib, {
        interval: 1000,
        limit
      }
    );
  } else {
    req = requestLib;
  }

  return new Promise((resolve, reject) => {
    req(opts)
      .then((response) => resolve(response.body))
      .catch((error) => reject(error));
  });
}

async function request (opts, limit) {
  debug('Making request: %j', opts);
  let lastError;
  const totalAttempts = getProxyCount() > 0 ? getProxyCount() : 1;

  for (let attemptIndex = 0; attemptIndex <= totalAttempts; attemptIndex++) {
    let agent = undefined;
    if(attemptIndex) {
      agent = getProxyAgentByIndex(attemptIndex);
    }

    const optionsWithProxy = {
      ...opts,
      agent: agent ? { https: agent } : undefined 
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
  // Nếu chạy ra khỏi vòng lặp (tức là thử hết proxy mà vẫn fail)
  console.log(`Request failed after ${totalAttempts} attempts.`);
  let message = 'Error requesting Google Play:' + (lastError ? lastError.message : 'Unknown Error');
  if (lastError && lastError.response && lastError.response.statusCode === 404) {
    message = 'App not found (404)';
  }
  const err = Error(message);
  err.status = lastError && lastError.response && lastError.response.statusCode;
  throw err; // Ném lỗi cuối cùng
}

export default request;
