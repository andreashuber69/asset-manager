var __wpo = {"assets":{"main":["/net-worth/img/cryptocompare.6eae0308.png","/net-worth/img/bitcoingold.32da808e.png","/net-worth/img/background.03f488ed.png","/net-worth/img/blockcypher.2fc542e8.svg","/net-worth/img/blockchain.90495685.svg","/net-worth/fonts/Roboto-Regular.73f0a88b.woff2","/net-worth/fonts/Roboto-Medium.90d16760.woff2","/net-worth/fonts/Roboto-Bold.b52fac2b.woff2","/net-worth/img/blockscout.23a708dc.svg","/net-worth/fonts/MaterialIcons-Regular.8a9a261c.woff2","/net-worth/img/quandl.c53e90c0.svg","/net-worth/css/app.cfadf482.css","/net-worth/js/app.86a3fda8.js","/net-worth/css/chunk-vendors.31ab78bd.css","/net-worth/js/chunk-vendors.37447d47.js","/net-worth/","/net-worth/icon-192x192.png","/net-worth/icon-512x512.png","/net-worth/manifest.json","/net-worth/robots.txt","/net-worth/favicon.ico"],"additional":[],"optional":[]},"externals":[],"hashesMap":{"05457491fab6ac077d7c5e4f7cd70ef304f087d1":"/net-worth/img/cryptocompare.6eae0308.png","47d2c01831ffb6a410e28e6b59cca26202e96f32":"/net-worth/img/bitcoingold.32da808e.png","c1dec37a7fb69e0a7f881112e8ff9b916e33760c":"/net-worth/img/background.03f488ed.png","d79ec42a8700aac0ab39b5ba091cd469f7209df9":"/net-worth/img/blockcypher.2fc542e8.svg","9406a7886c0a0913a8f9978e405335c6ca4a6922":"/net-worth/img/blockchain.90495685.svg","463a07f5c66bf14e6d9d6e0f6d5e3fd3cb11f4ec":"/net-worth/fonts/Roboto-Regular.73f0a88b.woff2","e24a020df79c6ce3bcc4a6a33930f697b8e1d6b2":"/net-worth/fonts/Roboto-Medium.90d16760.woff2","977c5749fd06192dac5224811ed69e53a6b2b47d":"/net-worth/fonts/Roboto-Bold.b52fac2b.woff2","e35913bb9eeaf122168ce1ec69b82636a5051f28":"/net-worth/img/blockscout.23a708dc.svg","75c69e8b7c1ceaeac5f8876e77a4d67c3d01ce43":"/net-worth/fonts/MaterialIcons-Regular.8a9a261c.woff2","c0d58df3e34e14f4e9b400010d236b6b5d4bc6c0":"/net-worth/img/quandl.c53e90c0.svg","50abbbceb3ac1aebbbfda6d4c77c62f8cdc43c08":"/net-worth/css/app.cfadf482.css","97fde42b33b7f14cab34bfa620793ddab9a8ac1a":"/net-worth/js/app.86a3fda8.js","dc5be1b8d47ac192cf3ffd87f836ba120d5a0f37":"/net-worth/css/chunk-vendors.31ab78bd.css","358d87fe87f543b82ebc06080e2e3bba31347031":"/net-worth/js/chunk-vendors.37447d47.js","2a6246edd99c4cd6d67c4d7ff1222c67b14072bc":"/net-worth/","003acb083c5dab8c66739cc82fb721305cd79bbc":"/net-worth/icon-192x192.png","a4204145b36288eacb282e1aead383bc24d167cb":"/net-worth/icon-512x512.png","250a5876093e5236944f8acacbd8deab72bec0c0":"/net-worth/manifest.json","65990256b6ebe0149d8edfcae37274b6af3e42ae":"/net-worth/robots.txt","dc8ef5a360cb9935dbcafef7e2e045b280095341":"/net-worth/favicon.ico"},"strategy":"changed","responseStrategy":"cache-first","version":"2/1/2020, 10:37:37 AM","name":"webpack-offline","pluginVersion":"5.0.7","relativePaths":false};

(function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/net-worth/",t(t.s="33ba")})({"33ba":function(e,n,t){"use strict";if(function(){var e=ExtendableEvent.prototype.waitUntil,n=FetchEvent.prototype.respondWith,t=new WeakMap;ExtendableEvent.prototype.waitUntil=function(n){var r=this,o=t.get(r);if(!o)return o=[Promise.resolve(n)],t.set(r,o),e.call(r,Promise.resolve().then(function e(){var n=o.length;return Promise.all(o.map(function(e){return e["catch"](function(){})})).then(function(){return o.length!=n?e():(t["delete"](r),Promise.all(o))})}));o.push(Promise.resolve(n))},FetchEvent.prototype.respondWith=function(e){return this.waitUntil(e),n.call(this,e)}}(),"undefined"===typeof r)var r=!1;function o(e,n){var t=n.cacheMaps,o=n.navigationPreload,u=e.strategy,l=e.responseStrategy,h=e.assets,d=e.hashesMap,p=e.externals,v=e.prefetchRequest||{credentials:"same-origin",mode:"cors"},m=e.name,g=e.version,w=m+":"+g,y=m+"$preload",b="__offline_webpack__data";C();var P=[].concat(h.main,h.additional,h.optional);function O(){if(!h.additional.length)return Promise.resolve();r&&console.log("[SW]:","Caching additional");var e=void 0;return e="changed"===u?U("additional"):S("additional"),e["catch"](function(e){console.error("[SW]:","Cache section `additional` failed to load")})}function S(n){var t=h[n];return caches.open(w).then(function(r){return A(r,t,{bust:e.version,request:v,failAll:"main"===n})}).then(function(){f("Cached assets: "+n,t)})["catch"](function(e){throw console.error(e),e})}function U(n){return x().then(function(t){if(!t)return S(n);var r=t[0],o=t[1],i=t[2],a=i.hashmap,c=i.version;if(!i.hashmap||c===e.version)return S(n);var u=Object.keys(a).map(function(e){return a[e]}),s=o.map(function(e){var n=new URL(e.url);return n.search="",n.hash="",n.toString()}),l=h[n],p=[],m=l.filter(function(e){return-1===s.indexOf(e)||-1===u.indexOf(e)});Object.keys(d).forEach(function(e){var n=d[e];if(-1!==l.indexOf(n)&&-1===m.indexOf(n)&&-1===p.indexOf(n)){var t=a[e];t&&-1!==s.indexOf(t)?p.push([t,n]):m.push(n)}}),f("Changed assets: "+n,m),f("Moved assets: "+n,p);var g=Promise.all(p.map(function(e){return r.match(e[0]).then(function(n){return[e[1],n]})}));return caches.open(w).then(function(t){var r=g.then(function(e){return Promise.all(e.map(function(e){return t.put(e[0],e[1])}))});return Promise.all([r,A(t,m,{bust:e.version,request:v,failAll:"main"===n,deleteFirst:"main"!==n})])})})}function R(){return caches.keys().then(function(e){var n=e.map(function(e){if(0===e.indexOf(m)&&0!==e.indexOf(w))return console.log("[SW]:","Delete cache:",e),caches["delete"](e)});return Promise.all(n)})}function x(){return caches.keys().then(function(e){var n=e.length,t=void 0;while(n--)if(t=e[n],0===t.indexOf(m))break;if(t){var r=void 0;return caches.open(t).then(function(e){return r=e,e.match(new URL(b,location).toString())}).then(function(e){if(e)return Promise.all([r,r.keys(),e.json()])})}})}function q(){return caches.open(w).then(function(n){var t=new Response(JSON.stringify({version:e.version,hashmap:d}));return n.put(new URL(b,location).toString(),t)})}function W(e,n,t){return L(e),i(t,w).then(function(o){if(o)return r&&console.log("[SW]:","URL ["+t+"]("+n+") from cache"),o;var i=fetch(e.request).then(function(o){return o.ok?(r&&console.log("[SW]:","URL ["+n+"] from network"),t===n&&function(){var t=o.clone(),r=caches.open(w).then(function(e){return e.put(n,t)}).then(function(){console.log("[SW]:","Cache asset: "+n)});e.waitUntil(r)}(),o):(r&&console.log("[SW]:","URL ["+n+"] wrong response: ["+o.status+"] "+o.type),o)});return i})}function k(e,n,t){return F(e).then(function(e){if(e.ok)return r&&console.log("[SW]:","URL ["+n+"] from network"),e;throw e})["catch"](function(e){return r&&console.log("[SW]:","URL ["+n+"] from cache if possible"),i(t,w).then(function(n){if(n)return n;if(e instanceof Response)return e;throw e})})}function L(e){if(o&&"function"===typeof o.map&&e.preloadResponse&&"navigate"===e.request.mode){var n=o.map(new URL(e.request.url),e.request);n&&_(n,e)}}self.addEventListener("install",function(e){console.log("[SW]:","Install event");var n=void 0;n="changed"===u?U("main"):S("main"),e.waitUntil(n)}),self.addEventListener("activate",function(e){console.log("[SW]:","Activate event");var n=O();n=n.then(q),n=n.then(R),n=n.then(function(){if(self.clients&&self.clients.claim)return self.clients.claim()}),o&&self.registration.navigationPreload&&(n=Promise.all([n,self.registration.navigationPreload.enable()])),e.waitUntil(n)}),self.addEventListener("fetch",function(e){if("GET"===e.request.method&&("only-if-cached"!==e.request.cache||"same-origin"===e.request.mode)){var n=new URL(e.request.url);n.hash="";var t=n.toString();-1===p.indexOf(t)&&(n.search="",t=n.toString());var r=-1!==P.indexOf(t),i=t;if(!r){var a=T(e.request);a&&(i=a,r=!0)}if(r){var c=void 0;c="network-first"===l?k(e,t,i):W(e,t,i),e.respondWith(c)}else{if("navigate"===e.request.mode&&!0===o)return void e.respondWith(F(e));if(o){var u=M(e);if(u)return void e.respondWith(u)}}}}),self.addEventListener("message",function(e){var n=e.data;if(n)switch(n.action){case"skipWaiting":self.skipWaiting&&self.skipWaiting();break}});var E=new Map;function _(e,n){var t=new URL(e,location),r=n.preloadResponse;E.set(r,{url:t,response:r});var o=function(){return E.has(r)},i=r.then(function(e){if(e&&o()){var n=e.clone();return caches.open(y).then(function(e){if(o())return e.put(t,n).then(function(){if(!o())return caches.open(y).then(function(e){return e["delete"](t)})})})}});n.waitUntil(i)}function j(e){if(E){var n=void 0,t=void 0;return E.forEach(function(r,o){r.url.href===e.href&&(n=r.response,t=o)}),n?(E["delete"](t),n):void 0}}function M(e){var n=new URL(e.request.url);if(self.registration.navigationPreload&&o&&o.test&&o.test(n,e.request)){var t=j(n),r=e.request;return t?(e.waitUntil(caches.open(y).then(function(e){return e["delete"](r)})),t):i(r,y).then(function(n){return n&&e.waitUntil(caches.open(y).then(function(e){return e["delete"](r)})),n||fetch(e.request)})}}function C(){Object.keys(h).forEach(function(e){h[e]=h[e].map(function(e){var n=new URL(e,location);return n.hash="",-1===p.indexOf(e)&&(n.search=""),n.toString()})}),d=Object.keys(d).reduce(function(e,n){var t=new URL(d[n],location);return t.search="",t.hash="",e[n]=t.toString(),e},{}),p=p.map(function(e){var n=new URL(e,location);return n.hash="",n.toString()})}function A(e,n,t){n=n.slice();var r=t.bust,o=!1!==t.failAll,i=!0===t.deleteFirst,c=t.request||{credentials:"omit",mode:"cors"},u=Promise.resolve();return i&&(u=Promise.all(n.map(function(n){return e["delete"](n)["catch"](function(){})}))),Promise.all(n.map(function(e){return r&&(e=a(e,r)),fetch(e,c).then(s).then(function(e){return e.ok?{response:e}:{error:!0}},function(){return{error:!0}})})).then(function(t){return o&&t.some(function(e){return e.error})?Promise.reject(new Error("Wrong response status")):(o||(t=t.filter(function(e,t){return!e.error||(n.splice(t,1),!1)})),u.then(function(){var r=t.map(function(t,r){var o=t.response;return e.put(n[r],o)});return Promise.all(r)}))})}function T(e){var n=e.url,r=new URL(n),o=void 0;o=c(e)?"navigate":r.origin===location.origin?"same-origin":"cross-origin";for(var i=0;i<t.length;i++){var a=t[i];if(a&&(!a.requestTypes||-1!==a.requestTypes.indexOf(o))){var u=void 0;if(u="function"===typeof a.match?a.match(r,e):n.replace(a.match,a.to),u&&u!==n)return u}}}function F(e){return e.preloadResponse&&!0===o?e.preloadResponse.then(function(n){return n||fetch(e.request)}):fetch(e.request)}}function i(e,n){return caches.match(e,{cacheName:n}).then(function(t){return u(t)?t:s(t).then(function(t){return caches.open(n).then(function(n){return n.put(e,t)}).then(function(){return t})})})["catch"](function(){})}function a(e,n){var t=-1!==e.indexOf("?");return e+(t?"&":"?")+"__uncache="+encodeURIComponent(n)}function c(e){return"navigate"===e.mode||e.headers.get("Upgrade-Insecure-Requests")||-1!==(e.headers.get("Accept")||"").indexOf("text/html")}function u(e){return!e||!e.redirected||!e.ok||"opaqueredirect"===e.type}function s(e){if(u(e))return Promise.resolve(e);var n="body"in e?Promise.resolve(e.body):e.blob();return n.then(function(n){return new Response(n,{headers:e.headers,status:e.status})})}function f(e,n){console.groupCollapsed("[SW]:",e),n.forEach(function(e){console.log("Asset:",e)}),console.groupEnd()}o(__wpo,{loaders:{},cacheMaps:[],navigationPreload:!1}),e.exports=t("3f76")},"3f76":function(e,n){}});