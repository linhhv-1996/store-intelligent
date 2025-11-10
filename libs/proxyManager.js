'use strict';
const { HttpsProxyAgent } = require('hpagent');

let proxyList = []; 
let fetchInterval; 
const REFETCH_INTERVAL_MS = 5 * 60 * 1000;

async function fetchProxiesFromUrl() {
  const PROXY_URL = process.env.PROXY_LIST_URL;
  if (!PROXY_URL) {
    if (!fetchInterval) { 
      console.warn('⚠️ PROXY_LIST_URL chưa được set. Sẽ chạy không cần proxy.');
    }
    return;
  }
  try {
    const res = await fetch(PROXY_URL);
    if (!res.ok) {
      throw new Error(`Gist fetch error: ${res.statusText}`);
    }
    const textData = await res.text();
    const newList = textData
      .split('\n') 
      .map(line => line.trim()) 
      .filter(Boolean) 
      .map(line => {
        const parts = line.split(':');
        if (parts.length === 4) { 
          const [ip, port, user, pass] = parts;
          return `http://${user}:${pass}@${ip}:${port}`;
        }
        if (parts.length === 2) {
          return `http://${parts[0]}:${parts[1]}`;
        }
        return null;
      })
      .filter(Boolean); 

    if (newList.length > 0) {
      if (JSON.stringify(proxyList) !== JSON.stringify(newList)) {
         console.log(`✅ [ProxyManager] Đã tải/làm mới ${newList.length} proxies từ URL.`);
         proxyList = newList; 
      }
    } else {
      console.warn('⚠️ [ProxyManager] File proxy tải về bị rỗng, giữ nguyên list cũ.');
    }
  } catch (e) {
    console.error('❌ Lỗi khi tải proxy list, sẽ thử lại sau:', e.message);
  }
}

async function initializeProxyList() {
  await fetchProxiesFromUrl(); 
  if (fetchInterval) clearInterval(fetchInterval); 
  fetchInterval = setInterval(fetchProxiesFromUrl, REFETCH_INTERVAL_MS);
  console.log(`[ProxyManager] Đã bật tự động làm mới proxy mỗi ${REFETCH_INTERVAL_MS / 1000} giây.`);
}

function getProxyAgentByIndex(index) {
  if (proxyList.length === 0 || index >= proxyList.length) {
    return undefined; 
  }
  const proxyUrl = proxyList[index]; 

  // Tạo mới agent, đéo cache
  const agent = new HttpsProxyAgent({
    keepAlive: true, 
    keepAliveMsecs: 1000,
    maxSockets: 256,
    maxFreeSockets: 256,
    proxy: proxyUrl,
  });
  return agent;
}

function getProxyCount() {
  return proxyList.length;
}

// Export kiểu CJS
module.exports = {
  initializeProxyList,
  getProxyAgentByIndex,
  getProxyCount
};
