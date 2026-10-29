// 한 번 열어 두면 인터넷 없이도 실행되도록 앱 파일을 저장해 둡니다.
// 앱을 수정해서 다시 올릴 때는 아래 버전 숫자를 올려주세요.
const CACHE = 'akbo-v3';
const FILES = [
  './', 'index.html', 'pdf-lib.min.js', 'manifest.webmanifest',
  'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'favicon.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).catch(() => caches.match('index.html')))
  );
});
