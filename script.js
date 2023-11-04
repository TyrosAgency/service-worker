// document.addEventListener("DOMContentLoaded", function () {
//   var myButton = document.getElementById("myButton");

//   myButton.addEventListener("click", function () {
//     if ("caches" in window) {
//       // Clear all caches
//       caches.keys().then(function (cacheNames) {
//         cacheNames.forEach(function (cacheName) {
//           window.caches.delete(cacheName);
//         });
//         console.log("Cache cleared successfully.");
//       });
//     }
//   });
// });
////////////////////////////////////////////////////////////////////////////////////////////////////
// Add your SSE code here

// var eventSource = new EventSource("http://localhost/service-worker/sse.php");
// console.log("Creating EventSource...");
// eventSource.retry = 5000; // Retry connection after 5 seconds (5000 milliseconds)

// eventSource.addEventListener("cache-cleared", function (event) {
//   console.log("Cache cleared event received.");
//   // Clear the cache in the browser
//   if ("caches" in window) {
//     caches.keys().then(function (cacheNames) {
//       cacheNames.forEach(function (cacheName) {
//         window.caches.delete(cacheName);
//       });
//       console.log("Cache cleared successfully.");
//     });
//   }
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////

var eventSource = new EventSource("http://localhost/service-worker/sse.php");
console.log("Creating EventSource...");
eventSource.retry = 5000; // Retry connection after 5 seconds (5000 milliseconds)

eventSource.addEventListener("cache-cleared", async function (event)
{
  console.log("Cache cleared event received.");
  // Clear the cache in the browser
  if ("caches" in window)
  {
    try
    {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
      console.log("Cache cleared successfully.");
    } catch (error)
    {
      console.error("Cache clearing failed:", error);
    }
  }
});
