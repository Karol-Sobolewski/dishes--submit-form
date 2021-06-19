const cacheName = `app-name`;
const filesToCache = [
  `/icon/android-icon-144x144.png`,
  `/icon/android-icon-192x192.png`,
  `/icon/android-icon-36x36.png\t`,
  `/icon/android-icon-48x48.png\t`,
  `/icon/android-icon-72x72.png\t`,
  `/icon/android-icon-96x96.png\t`,
  `/icon/apple-icon-114x114.png\t`,
  `/icon/apple-icon-120x120.png\t`,
  `/icon/apple-icon-144x144.png\t`,
  `/icon/apple-icon-152x152.png`,
  `/icon/apple-icon-180x180.png`,
  `/icon/apple-icon-57x57.png\t`,
  `/icon/apple-icon-60x60.png\t`,
  `/icon/apple-icon-72x72.png\t`,
  `/icon/apple-icon-76x76.png\t`,
  `/icon/apple-icon-precomposed.png`,
  `/icon/apple-icon.png\t`,
  `/icon/favicon-16x16.png`,
  `/icon/favicon-32x32.png`,
  `/icon/favicon-96x96.png`,
  `/icon/favicon.ico`,
  `/icon/ms-icon-144x144.png`,
  `/icon/ms-icon-150x150.png`,
  `/icon/ms-icon-310x310.png`,
  `/icon/ms-icon-70x70.png`,
  `/index.html`,
];
self.addEventListener(`install`, function (e) {  //eslint-disable-line
  console.log(`[ServiceWorker] Install`);
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log(`[ServiceWorker] Caching app shell`);
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener(`activate`, (event) => {//eslint-disable-line
  event.waitUntil(self.clients.claim());//eslint-disable-line
});
self.addEventListener(`fetch`, (event) => {//eslint-disable-line
  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then((response) => response || fetch(event.request))
  );
});
