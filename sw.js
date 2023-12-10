// self.addEventListener("notificationclick", function (event) {
//   console.log("notificación abierta");
// });

// self.addEventListener("notificationclick", function (event) {
//   const channel = new BroadcastChannel("sw-mensajes");
//   if (event.action == "aceptar") {
//     channel.postMessage({ title: "aceptar" });
//   }

//   if (event.action == "rechazar") {
//     channel.postMessage({ title: "rechazar" });
//   }
// });

// self.addEventListener("install", event => {
//   console.log("Service worker installed");
// });
// self.addEventListener("activate", event => {
//   console.log("Service worker activated");
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(fetch(event.request));
// });