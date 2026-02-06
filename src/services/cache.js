const cache = new Map();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// check cache if exists and not expired
export function getCached(key) {
  // ← Renamed from getCache
  const item = cache.get(key);

  // if nothing, null
  if (!item) return null;

  // check expiration
  if (Date.now() > item.expiry) {
    // expired
    cache.delete(key);
    return null;
  }

  return item.data; // ← Changed from item.value
}

export function setCache(key, data, duration = CACHE_DURATION) {
  cache.set(key, {
    data: data,
    expiry: Date.now() + duration,
  });
}

export function invalidateCache(key) {
  cache.delete(key);
}

export function clearCache() {
  cache.clear();
}
