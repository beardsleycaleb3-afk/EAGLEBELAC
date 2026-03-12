const CACHE_NAME = 'EAGLEBELAC-v4'; // Bump version for update
const FILES_TO_CACHE = [
    'index.html',           // Fixed: no ./ root
    'manifest.json',
    'icon-192.jpg',
    'icon-512.jpg',
    // Note: Three.js WON'T work offline - would need local copy
    '1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3',
    // ... all your assets (unchanged - perfect)
    'assets/core/a.jpeg', 'assets/core/aa.jpeg', 'assets/core/aaa.jpeg', 
    'assets/core/aaaa.jpeg', 'assets/core/aaaaa.jpeg',
    'assets/core/b.jpeg', 'assets/core/bb.jpeg', 'assets/core/bbb.jpeg', 
    'assets/core/bbbb.jpeg', 'assets/core/bbbbb.jpeg',
    'assets/core/c.jpeg', 'assets/core/cc.jpeg', 'assets/core/ccc.jpeg', 
    'assets/core/cccc.jpeg', 'assets/core/ccccc.jpeg',
    'assets/core/d.jpeg', 'assets/core/dd.jpeg', 'assets/core/ddd.jpeg', 
    'assets/core/dddd.jpeg', 'assets/core/ddddd.jpeg',
    'assets/core/e.jpeg', 'assets/core/ee.jpeg', 'assets/core/eee.jpeg', 
    'assets/core/eeee.jpeg', 'assets/core/eeeee.jpeg',
    'assets/bg/1.jpeg', 'assets/bg/11.jpeg', 'assets/bg/111.jpeg', 
    'assets/bg/1111.jpeg', 'assets/bg/11111.jpeg',
    'assets/bg/2.jpeg', 'assets/bg/22.jpeg', 'assets/bg/222.jpeg', 
    'assets/bg/2222.jpeg', 'assets/bg/22222.jpeg',
    'assets/bg/3.jpeg', 'assets/bg/33.jpeg', 'assets/bg/333.jpeg', 
    'assets/bg/3333.jpeg', 'assets/bg/33333.jpeg',
    'assets/bg/4.jpeg', 'assets/bg/44.jpeg', 'assets/bg/444.jpeg', 
    'assets/bg/4444.jpeg', 'assets/bg/44444.jpeg',
    'assets/bg/5.jpeg', 'assets/bg/55.jpeg', 'assets/bg/555.jpeg', 
    'assets/bg/55555.jpeg'
];

self.addEventListener('install', e => {
    self.skipWaiting(); // Instant activation
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .catch(err => console.log('Cache install failed:', err))
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
            )
        )
    );
    self.clients.claim(); // Take control immediately
});

self.addEventListener('fetch', e => {
    // Ignore non-GET requests and non-document/audio/image requests
    if (e.request.method !== 'GET') return;
    
    e.respondWith(
        caches.match(e.request)
            .then(response => {
                // Return cached version or fetch fresh
                return response || fetch(e.request).catch(() => {
                    // Offline fallback for HTML
                    if (e.request.destination === 'document') {
                        return caches.match('index.html');
                    }
                });
            })
    );
});
