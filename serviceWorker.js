//service worker based on following source code: https://github.com/ondras/rri/blob/master/sw.js and https://serviceworke.rs/strategy-cache-and-update_service-worker_doc.html
const CACHE_NAME = "sw-cache-v3";

async function precache() {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(["."]);
}

async function respondWithCache(request) {
    const cached = await caches.match(request);

    if (cached) { // try updating the cache first
        try {
            let response = await fetch(request);
            let cache = await caches.open(CACHE_NAME);
            await cache.put(request, response.clone());
            return response;
        } catch (e) { // offline
            return cached;
        }
    } else { // not cached, forward to network
        return fetch(request);
    }
}

async function onInstall(e) {
    console.log('The service worker is being installed.');
    e.waitUntil(precache());
    console.log('Precache process finished.');
}

async function onFetch(e) {
    console.log('Fetching request...');
    e.respondWith(respondWithCache(e.request));
}

self.addEventListener("install", onInstall);
self.addEventListener("fetch", onFetch);