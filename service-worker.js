// Service worker registration
if ("serviceWorker" in navigator)
{
  navigator.serviceWorker
    .register("/service-worker/service-worker.js")
    .then(function (registration)
    {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch(function (error)
    {
      console.error("Service Worker registration failed:", error);
    });
}

// Service worker implementation
// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches
//       .open("my-cache-name")
//       .then(function (cache) {
//         return cache.match(event.request).then(function (cachedResponse) {
//           if (cachedResponse) {
//             // Cached response found, check cache validity with server
//             return fetch(event.request, { method: "HEAD" })
//               .then(function (serverResponse) {
//                 if (serverResponse.status === 200) {
//                   var networkEtag = serverResponse.headers.get("Etag");
//                   var networkLastModified =
//                     serverResponse.headers.get("Last-Modified");
//                   var cachedEtag = cachedResponse.headers.get("Etag");
//                   var cachedLastModified =
//                     cachedResponse.headers.get("Last-Modified");

//                   if (
//                     networkEtag === cachedEtag &&
//                     networkLastModified === cachedLastModified
//                   ) {
//                     // Cache is valid, return the cached response
//                     console.log(
//                       "Returning cached resource:",
//                       event.request.url
//                     );
//                     return cachedResponse;
//                   } else {
//                     // Cache is invalid, delete the cached version
//                     cache.delete(event.request);

//                     // Fetch from server and return the response before caching it again
//                     return fetch(event.request).then(function (response) {
//                       // Clone the response to use it both in the cache and as the final response
//                       var responseClone = response.clone();

//                       // Cache the response
//                       cache.put(event.request, responseClone);

//                       // Log that the resource is retrieved from the server
//                       console.log(
//                         "Retrieved resource from server:",
//                         event.request.url
//                       );

//                       // Return the response from the server
//                       return response;
//                     });
//                   }
//                 }
//               })
//               .catch(function (error) {
//                 console.error("Cache validity check failed:", error);
//                 return cachedResponse;
//               });
//           }

//           // Cached response not found, fetch from server
//           return fetch(event.request).then(function (response) {
//             // Clone the response to use it both in the cache and as the final response
//             var responseClone = response.clone();

//             // Cache the response
//             cache.put(event.request, responseClone);

//             // Log that the resource is retrieved from the server
//             console.log("Retrieved resource from server:", event.request.url);

//             // Return the response
//             return response;
//           });
//         });
//       })
//       .catch(function (error) {
//         console.error("Cache match failed:", error);
//         return fetch(event.request);
//       })
//   );
// });

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches
//       .open("my-cache-name")
//       .then(function (cache) {
//         return cache.match(event.request).then(function (cachedResponse) {
//           if (cachedResponse) {
//             // Cached response found, return it
//             console.log("Returning cached resource:", event.request.url);
//             return cachedResponse;
//           }

//           // Cached response not found, fetch from server
//           return fetch(event.request)
//             .then(function (response) {
//               // Clone the response to use it both in the cache and as the final response
//               var responseClone = response.clone();

//               // Cache the response
//               cache.put(event.request, responseClone);

//               // Log that the resource is retrieved from the server
//               console.log("Retrieved resource from server:", event.request.url);

//               // Return the response
//               return response;
//             })
//             .catch(function (error) {
//               console.error("Fetch failed:", error);
//             });
//         });
//       })
//       .catch(function (error) {
//         console.error("Cache match failed:", error);
//       })
//   );
// });

self.addEventListener("fetch", function (event)
{
  // Get the request URL and check if it is a GET request or the file ends with .js or .css
  var requestUrl = new URL(event.request.url);
  if (
    event.request.method !== "GET" ||
    !(
      requestUrl.pathname.endsWith(".js") ||
      requestUrl.pathname.endsWith(".css") ||
      requestUrl.pathname.endsWith(".json")
    )
  )
  {
    // Proceed with default fetch behavior for non-matching requests
    return;
  }

  event.respondWith(
    caches
      .open("my-cache-name")
      .then(function (cache)
      {
        return cache.match(event.request).then(function (cachedResponse)
        {
          if (cachedResponse)
          {
            // Cached response found, return it
            console.log("Returning cached resource:", event.request.url);
            return cachedResponse;
          }

          // Cached response not found, fetch from server
          return fetch(event.request)
            .then(function (response)
            {
              // Clone the response to use it both in the cache and as the final response
              var responseClone = response.clone();

              // Cache the response
              cache.put(event.request, responseClone);

              // Log that the resource is retrieved from the server
              console.log("Retrieved resource from server:", event.request.url);

              // Return the response
              return response;
            })
            .catch(function (error)
            {
              console.error("Fetch failed:", error);
            });
        });
      })
      .catch(function (error)
      {
        console.error("Cache match failed:", error);
      })
  );
});
