console.log('Hello from service-worker.js');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    workbox.routing.registerRoute(
        /\.(js|ts)$/,
        new workbox.strategies.NetworkFirst()
    );

    workbox.routing.registerRoute(
        /\.(css|styl)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'css-cache',
        })
    );

    workbox.routing.registerRoute(
        /\.(?:png|jpg|jpeg|svg|gif)$/,
        // Use the cache if it's available.
        new workbox.strategies.CacheFirst({
            cacheName: 'image-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 20,
                    // TODO
                    // maxAgeSeconds: 7 * 24 * 60 * 60
                    maxAgeSeconds: 7
                })
            ],
        })
    );

    // Offline
    workbox.precaching.precache(['offline.html']);
    workbox.routing.setDefaultHandler(
        new workbox.strategies.StaleWhileRevalidate()
    );
    workbox.routing.setCatchHandler(({event}) => {
        return caches.match('/offline.html');
    });
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
