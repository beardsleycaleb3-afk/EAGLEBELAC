const CACHE_NAME = 'EAGLEBELAC-v2';  

const FILES_TO_CACHE = [
    './',
    'index.html',
    'manifest.json',
    'sw.js',
    'icon-512.jpg',  
    'icon-192.jpg',

    // Audio files
    '1.mp3',
    '2.mp3', 
    '3.mp3',
    '4.mp3',
    '5.mp3',

    // CORE 
    'assets/core/a.jpeg',
    'assets/core/aa.jpeg',
    'assets/core/aaa.jpeg',
    'assets/core/aaaa.jpeg',
    'assets/core/aaaaa.jpeg',
    'assets/core/b.jpeg',
    'assets/core/bb.jpeg',
    'assets/core/bbb.jpeg',
    'assets/core/bbbb.jpeg',
    'assets/core/bbbbb.jpeg',
    'assets/core/c.jpeg',
    'assets/core/cc.jpeg',
    'assets/core/ccc.jpeg',
    'assets/core/cccc.jpeg',
    'assets/core/ccccc.jpeg',
    'assets/core/d.jpeg',
    'assets/core/dd.jpeg',
    'assets/core/ddd.jpeg',
    'assets/core/dddd.jpeg',
    'assets/core/ddddd.jpeg',
    'assets/core/e.jpeg',
    'assets/core/ee.jpeg',
    'assets/core/eee.jpeg',
    'assets/core/eeee.jpeg',
    'assets/core/eeeee.jpeg',

    // bg
    'assets/bg/1.jpeg',
    'assets/bg/11.jpeg',
    'assets/bg/111.jpeg',
    'assets/bg/1111.jpeg',
    'assets/bg/11111.jpeg',
    'assets/bg/2.jpeg',
    'assets/bg/22.jpeg',
    'assets/bg/222.jpeg',
    'assets/bg/2222.jpeg',
    'assets/bg/22222.jpeg',
    'assets/bg/3.jpeg',
    'assets/bg/33.jpeg',
    'assets/bg/333.jpeg',
    'assets/bg/3333.jpeg',
    'assets/bg/33333.jpeg',
    'assets/bg/4.jpeg',
    'assets/bg/44.jpeg',
    'assets/bg/444.jpeg',
    'assets/bg/4444.jpeg',
    'assets/bg/44444.jpeg',
    'assets/bg/5.jpeg',
    'assets/bg/55.jpeg',
    'assets/bg/555.jpeg',
    'assets/bg/5555.jpeg',
    'assets/bg/55555.jpeg',

    // THREE.JS FROM CDN — cached for offline
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
];

// Install 
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .then(() => self.skipWaiting())
            .catch(err => console.error('Cache install failed:', err))
    );
});

// Activate → clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) return caches.delete(cache);
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch → serve from cache first (full offline)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                return cachedResponse || fetch(event.request).catch(() => {
                    // Offline fallback - could show custom page
                    return new Response('Offline - EAGLEBELAC still works!', {
                        status: 200,
                        headers: { 'Content-Type': 'text/plain' }
                    });
                });
            })
    );
});
