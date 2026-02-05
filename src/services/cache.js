const cache = new Map();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// check cache if exists and not expired
export function getCache(key) {
    const item = cache.get(key);

    // if nothing, null
    if (!item) return null;

    // check expiration
    if (Date.now() > item.expiry) {
        // expired
        cache.delete(key);
        return null;
    }

    return item.value;
}

export function setCache(key, data, duration = CACHE_DURATION) {
    cache.set(key, {
        data: data, // the data to cache
        expiry: Date.now() + duration, // expiration time
    });
}

// housekeeping
// remove specific cache entry
export function invalidateCache(key) {
    cache.delete(key);
}

// clear all cache
export function clearCache() {
    cache.clear();
}