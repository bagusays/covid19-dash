let versionRevision = '100000402';

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.0/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

//dev or prod
workbox.setConfig({
    debug: true
});
// The most verbose - displays all logs.

self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});

// workbox.skipWaiting()
// workbox.clientsClaim()

let pages = ['/index.html', '/', '/about', '/tips-trick'];
pages = pages.map(x => {
    return {
        url: x,
        revision: versionRevision
    }
})

// Precache entries from workbox-build or somewhere else
workbox.precaching.precache([
    ...pages,
    {
        url: '/assets/css/main.css',
        revision: versionRevision,
    }, {
        url: '/assets/css/materialize.min.css',
        revision: versionRevision,
    }, {
        url: '/assets/img/COVIDweb_05_mask.png',
        revision: versionRevision,
    }, {
        url: '/assets/img/logo.png',
        revision: versionRevision,
    }, {
        url: '/assets/img/protect-wash-hands.png',
        revision: versionRevision,
    }, {
        url: '/assets/img/sneezingwoman.png',
        revision: versionRevision,
    },{
        url: '/app.bundle.js',
        revision: versionRevision,
    }, {
        url: '/assets/js/axios.min.js',
        revision: versionRevision,
    }, {
        url: '/assets/js/momentjs.min.js',
        revision: versionRevision,
    }, {
        url: '/assets/js/highcharts.js',
        revision: versionRevision,
    }, {
        url: '/assets/js/highchart-exporting.js',
        revision: versionRevision,
    }, {
        url: '/assets/js/jquery-slim.min.js',
        revision: versionRevision,
    }, {
        url: '/assets/js/materialize.min.js',
        revision: versionRevision,
    }
]);

// Add Precache Route
workbox.precaching.addRoute();

// const queue = new workbox.backgroundSync.Queue('myQueueName', {
//     callbacks: {
//         queueDidReplay: async (res) => {
//             console.log(await res[0].response.json())
//     },
//         replayDidFail: (hash) => {},
//         requestWillEnqueue: (reqData) => {},
//         requestWillDequeue: (reqData) => {},
//     },
// });

// self.addEventListener('fetch', (event) => {
//     console.log(event.request);
//     // Clone the request to ensure it's save to read when
//     // adding to the Queue.
//     const promiseChain = fetch(event.request.clone()).catch((err) => {
//         return queue.addRequest(event.request);
//     });

//     event.waitUntil(promiseChain);
// });

// workbox.routing.registerRoute(
//     // Cache CSS files.
//     // /^[^.]+$/,
//     /(\/$|\/\?.*$)/,
//     // Use cache but update in the background.
//     // new workbox.strategies.NetworkFirst()
//     new workbox.strategies.StaleWhileRevalidate({
//       // Use a custom cache name.
//       cacheName: 'route-cache',
//     })
// );

// workbox.routing.registerRoute(
//     // Cache CSS files.
//     new RegExp('/assets/img/.*'),
//     // Use cache but update in the background.
//     // new workbox.strategies.NetworkFirst()
//     new workbox.strategies.StaleWhileRevalidate({
//       // Use a custom cache name.
//       cacheName: 'image-static-cache',
//     })
// );

// workbox.routing.registerRoute(
//     // Cache CSS files.
//     /\.css$/,
//     // Use cache but update in the background.
//     // new workbox.strategies.NetworkFirst()
//     new workbox.strategies.StaleWhileRevalidate({
//       // Use a custom cache name.
//       cacheName: 'css-cache',
//     })
// );

// workbox.routing.registerRoute(
//     // Cache CSS files.
//     /\.js$/,
//     // Use cache but update in the background.
//     // new workbox.strategies.NetworkFirst()
//     new workbox.strategies.StaleWhileRevalidate({
//       // Use a custom cache name.
//       cacheName: 'js-cache',
//     })
// );