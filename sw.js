"use strict";

var pwaDealsCacheName = 'pwaDealsCacheV0';
var pwaDealsCachePagesName = 'pwaDealsCachePagesV0'; // versionamento da APPSHELL
var pwaDealsCacheImagesName = 'pwaDealsCacheImagesV0';

var pwaDealsCacheFiles = [
    'js/app.js',
    'js/dealService.js',
    'js/clientStorage.js',
    'js/swRegister.js',
    'js/template.js',
    './',
    'resources/es6-promise/es6-promise.js',
    'resources/fetch/fetch.js',
    'resources/localForage/dist/localforage.min.js',
    'resources/localForage-getItems/dist/localforage-getitems.js',
    'resources/localForage-setItems/dist/localforage-setitems.js',
    'resources/mdl/material.min.js',
    'resources/mdl/material.min.js.map',
    'resources/mdl/material.min.css',
    'resources/systemjs/system.js',
    'resources/systemjs/system-polyfills.js'
];

var latestPath = 'https://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service/latest-deals.php';
var imagePath = 'https://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service/car-image.php';
var dealPath = 'https://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service/car.php';


self.addEventListener('install', function (event) {
    console.log('SW Instalado: ', event);
    self.skipWaiting(); //passar a versão do SW para todas as abas abertas
    event.waitUntil( //aqui esperamos o client instalar o SW (isso se ñ der erro)
        caches.open(pwaDealsCacheName)
        .then(function (cache) {
            return cache.addAll(pwaDealsCacheFiles);
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log('SW Ativado: ', event);
    self.clients.claim(); //manda todas as seções atualizar imediatamente
    event.waitUntil(
        caches.keys()
        .then(function (cacheKeys) {
            let removePromises = [];
            for (let i = 0; i < removePromises.length; i++) {
                if (cacheKeys[i] != pwaDealsCacheName && cacheKeys[i] != pwaDealsCachePagesName && cacheKeys[i] != pwaDealsCacheImagesName) {
                    removePromises.push(caches.delete(cacheKeys[i]));
                }
            }
            return Promise.all(removePromises);
        })
    );
});

//o evento 'fetch' só é ativado depois que o SW é instalado ISSO É MUTO TOPO VEI... esse Response (nota mental: estudar PROMISES)
self.addEventListener('fetch', function (event) {
    let requestURL = new URL(event.request.url);
    let requestPath = requestURL.pathname;
    let fileName = requestPath.substring(requestPath.lastIndexOf('/' + 1));
    //network only strategy
    if (requestPath == latestPath || fileName == "sw.js") {
        event.respondWith(fetch(event.request));
    } else if (requestPath == imagePath) {
        event.respondWith(networkFirstStrategy(event.request));
    } else {
        event.respondWith(cacheFirstStrategy(event.request));
    }
});

//pegando arquivos do cache
function cacheFirstStrategy(request) {
    return caches.match(request).then(function (cacheResponse) {
        return cacheResponse || fetchRequestAndCache(request);
    });
}

function networkFirstStrategy(request) {
    return fetchRequestAndCache(request).catch(function (response) {
        return caches.match(request);
    });
}

//offline strategy
function fetchRequestAndCache(request) {
    return fetch(request).then(function (networkResponse) {
        caches.open(getCacheName(request)).then(function (cache) {
            cache.put(request, networkResponse);
        });
        return networkResponse.clone();
    });
}

function getCacheName(request) {
    let requestURL = new URL(request.url);
    let requestPath = requestURL.pathname;

    if (requestPath == imagePath) {
        return pwaDealsCacheImagesName;
    } else if (requestPath == dealPath) {
        return pwaDealsCachePagesName;
    } else {
        return pwaDealsCacheName;
    }
}