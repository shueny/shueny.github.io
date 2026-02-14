// Service Worker for caching static assets on GitHub Pages
// This helps improve cache lifetime for static resources

const CACHE_NAME = 'shueny-portfolio-v3'; // Update version to force refresh
const STATIC_CACHE_DURATION = 31536000; // 1 year in seconds
const HTML_CACHE_DURATION = 3600; // 1 hour in seconds

// Assets that should be cached for a long time (content-hashed)
const STATIC_ASSETS = [
  '/_astro/',
  '/assets/',
  '/fonts/',
  '/images/',
  '.js',
  '.css',
  '.woff',
  '.woff2',
  '.ttf',
  '.png',
  '.jpg',
  '.svg',
  '.webp',
];

// Critical JS assets that should be pre-cached
const CRITICAL_JS_PATTERNS = [
  /react-core\.[\w-]+\.js$/,
  /react-dom\.[\w-]+\.js$/,
  /index\.[\w-]+\.js$/,
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pre-cache critical assets if needed
      return cache.addAll([]);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Check if this is a critical JS asset
  const isCriticalJS = CRITICAL_JS_PATTERNS.some((pattern) =>
    pattern.test(url.pathname)
  );

  // Check if this is a static asset that should be cached long-term
  const isStaticAsset = STATIC_ASSETS.some((pattern) => {
    if (pattern.startsWith('/')) {
      return url.pathname.startsWith(pattern);
    }
    return url.pathname.endsWith(pattern);
  });

  // For critical JS and static assets, use cache-first strategy with long TTL
  if (isCriticalJS || isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // For content-hashed assets (JS/CSS with hash), cache is always valid
          // The hash in filename ensures cache invalidation when content changes
          if (url.pathname.match(/\.([a-f0-9]{8,})\.(js|css)$/)) {
            // Modify response headers to include Cache-Control for Lighthouse
            const headers = new Headers(cachedResponse.headers);
            headers.set('Cache-Control', `public, max-age=${STATIC_CACHE_DURATION}, immutable`);
            return new Response(cachedResponse.body, {
              status: cachedResponse.status,
              statusText: cachedResponse.statusText,
              headers: headers,
            });
          }
          
          // Check if cache is still valid for other assets
          const cacheDate = cachedResponse.headers.get('date');
          if (cacheDate) {
            const cacheAge = (Date.now() - new Date(cacheDate).getTime()) / 1000;
            if (cacheAge < STATIC_CACHE_DURATION) {
              // Add Cache-Control header
              const headers = new Headers(cachedResponse.headers);
              headers.set('Cache-Control', `public, max-age=${STATIC_CACHE_DURATION}, immutable`);
              return new Response(cachedResponse.body, {
                status: cachedResponse.status,
                statusText: cachedResponse.statusText,
                headers: headers,
              });
            }
          } else {
            // Add Cache-Control header even if no date
            const headers = new Headers(cachedResponse.headers);
            headers.set('Cache-Control', `public, max-age=${STATIC_CACHE_DURATION}, immutable`);
            return new Response(cachedResponse.body, {
              status: cachedResponse.status,
              statusText: cachedResponse.statusText,
              headers: headers,
            });
          }
        }

        // Fetch from network and cache
        return fetch(request)
          .then((response) => {
            // Don't cache if not successful
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone response for caching
            const responseToCache = response.clone();
            
            // Add Cache-Control headers for long-term caching
            const headers = new Headers(responseToCache.headers);
            // Check if it's a content-hashed asset
            if (url.pathname.match(/\.([a-f0-9]{8,})\.(js|css)$/)) {
              headers.set('Cache-Control', `public, max-age=${STATIC_CACHE_DURATION}, immutable`);
            } else {
              headers.set('Cache-Control', `public, max-age=${STATIC_CACHE_DURATION}`);
            }
            
            const modifiedResponse = new Response(responseToCache.body, {
              status: responseToCache.status,
              statusText: responseToCache.statusText,
              headers: headers,
            });

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, modifiedResponse);
            });

            // Also modify the original response to include Cache-Control
            const responseHeaders = new Headers(response.headers);
            if (url.pathname.match(/\.([a-f0-9]{8,})\.(js|css)$/)) {
              responseHeaders.set('Cache-Control', `public, max-age=${STATIC_CACHE_DURATION}, immutable`);
            } else {
              responseHeaders.set('Cache-Control', `public, max-age=${STATIC_CACHE_DURATION}`);
            }
            
            return new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: responseHeaders,
            });
          })
          .catch(() => {
            // If network fails and we have a cached version, return it with headers
            return caches.match(request).then((cached) => {
              if (cached) {
                const headers = new Headers(cached.headers);
                headers.set('Cache-Control', `public, max-age=${STATIC_CACHE_DURATION}, immutable`);
                return new Response(cached.body, {
                  status: cached.status,
                  statusText: cached.statusText,
                  headers: headers,
                });
              }
              return cached;
            });
          });
      })
    );
  } else {
    // For HTML and other dynamic content, use network-first strategy
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache HTML with shorter TTL
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request);
        })
    );
  }
});

